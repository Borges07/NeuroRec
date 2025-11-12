package com.example.NeuroRec.service;

import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import com.example.NeuroRec.model.Course;

@Service
public class GroqService {

    private static final String GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    private final OkHttpClient client = new OkHttpClient();
    private final String apiKey;

    public GroqService() {
        this.apiKey = System.getenv("GROQ_API_KEY");
        System.out.println("Groq API Key carregada: " + (this.apiKey != null ? "OK" : "NULA"));
    }

    /**
     * Extrai a intenção do usuário pedindo ao modelo que responda em formato estruturado:
     *   categoria=<Programming|Design|Data Science|Geral>; filtro=<barato|avaliado|popular|nenhum>
     *
     * Retorna a string bruta recebida (já validada) ou um fallback "categoria=Geral; filtro=nenhum".
     */
    public String extrairIntencao(String mensagem) throws IOException {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalStateException("A API Key da Groq não foi configurada corretamente.");
        }

        // prompt mais estrito (substitui o system content anterior)
        String systemPrompt = """
            Você é um analisador de intenção. Analise a mensagem do usuário e RESPONDA APENAS
            no formato exato abaixo (sem texto adicional):
            categoria=<Programming|Design|Data Science|Geral>; filtro=<barato|avaliado|popular|nenhum>

            Regras:
            - Use apenas as categorias listadas (Programming, Design, Data Science, Geral).
            - Use apenas os filtros listados (barato, avaliado, popular, nenhum).
            - Se não souber, retorne: categoria=Geral; filtro=nenhum
            - Responda EXATAMENTE em uma linha, por exemplo:
              categoria=Data Science; filtro=barato

            Exemplos:
            "Quero cursos de dados baratos" -> categoria=Data Science; filtro=barato
            "Mostre cursos de design bem avaliados" -> categoria=Design; filtro=avaliado
            "Me recomende cursos de programação" -> categoria=Programming; filtro=nenhum
            """;

        JSONObject body = new JSONObject();
        JSONArray messages = new JSONArray()
                .put(new JSONObject().put("role", "system").put("content", systemPrompt))
                .put(new JSONObject().put("role", "user").put("content", mensagem));

        body.put("model", "llama-3.3-70b-versatile");
        body.put("messages", messages);

        Request request = new Request.Builder()
                .url(GROQ_URL)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .post(RequestBody.create(body.toString(), JSON))
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            System.out.println("Código de resposta Groq: " + response.code());
            System.out.println("Corpo de resposta: " + responseBody);

            if (response.code() == 403) {
                throw new IOException("403 Forbidden — Verifique se a API key tem acesso ao modelo ou se há erro de cabeçalho.");
            }

            if (!response.isSuccessful()) {
                throw new IOException("Erro na chamada à Groq API: " + response.code() + " - " + response.message());
            }

            JSONObject jsonResponse = new JSONObject(responseBody);
            String raw = jsonResponse
                    .getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content")
                    .trim();

            // validação simples do formato esperado: categoria=...; filtro=...
            if (!raw.matches("(?i)\\s*categoria\\s*=\\s*[^;]+\\s*;\\s*filtro\\s*=\\s*[^\\n]+\\s*")) {
                System.err.println("Intenção retornada fora do formato esperado: \"" + raw + "\". Usando fallback.");
                return "categoria=Geral; filtro=nenhum";
            }

            // retorna a string tal como veio (será parseada no controller)
            return raw;
        }
    }

    public String gerarRespostaNatural(List<Course> cursos) throws IOException {
        String cursosTexto = cursos.isEmpty()
                ? "Nenhum curso encontrado."
                : cursos.stream()
                .map(c -> String.format(
                        "Nome: %s | Categoria: %s | Descrição: %s | Preço: %.2f | Avaliação: %.1f",
                        c.getName(), c.getCategory(), c.getDescription(), c.getPrice(), c.getPreview()))
                .reduce((a, b) -> a + "\n" + b)
                .orElse("Nenhum curso encontrado.");

        JSONArray messages = new JSONArray()
                .put(new JSONObject().put("role", "system")
                        .put("content", "Você é um assistente amigável que recomenda cursos baseados em preferências do usuário."))
                .put(new JSONObject().put("role", "user")
                        .put("content", "Baseado nessa lista de cursos:\n" + cursosTexto +
                                "\nCrie uma resposta natural, útil, e resumida destacando os mais relevantes, baratos ou bem avaliados."));

        JSONObject body = new JSONObject()
                .put("model", "llama-3.3-70b-versatile")
                .put("messages", messages);

        Request request = new Request.Builder()
                .url(GROQ_URL)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .post(RequestBody.create(body.toString(), JSON))
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            System.out.println("Código de resposta Groq: " + response.code());
            System.out.println("Corpo de resposta: " + responseBody);

            if (response.code() == 403) {
                throw new IOException("403 Forbidden — Possível erro de autenticação ou limitação de requisições.");
            }

            JSONObject jsonResponse = new JSONObject(responseBody);
            return jsonResponse
                    .getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content");
        }
    }
}
