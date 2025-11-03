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

        // modicação só para salvar e n perder o projeto.
        private static final String GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
        private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

        private final OkHttpClient client = new OkHttpClient();
        private final String apiKey;

        public GroqService() {
                this.apiKey = System.getenv("GROQ_API_KEY");
                System.out.println("Groq API Key carregada: " + (this.apiKey != null ? "OK" : "NULA"));
        }

        public String extrairIntencao(String mensagem) throws IOException {
                if (apiKey == null || apiKey.isEmpty()) {
                        throw new IllegalStateException("A API Key da Groq não foi configurada corretamente.");
                }

                JSONObject body = new JSONObject();
                JSONArray messages = new JSONArray()
                                .put(new JSONObject().put("role", "system").put("content",
                                                "Você é um assistente que identifica a intenção de busca de cursos."))
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
                                throw new IOException(
                                                "403 Forbidden — Verifique se a API key tem acesso ao modelo ou se há erro de cabeçalho.");
                        }

                        if (!response.isSuccessful()) {
                                throw new IOException("Erro na chamada à Groq API: " + response.code() + " - "
                                                + response.message());
                        }

                        JSONObject jsonResponse = new JSONObject(responseBody);
                        return jsonResponse
                                        .getJSONArray("choices")
                                        .getJSONObject(0)
                                        .getJSONObject("message")
                                        .getString("content");
                }
        }

        public String gerarRespostaNatural(List<Course> cursos) throws IOException {
                String cursosTexto = cursos.isEmpty()
                                ? "Nenhum curso encontrado."
                                : cursos.stream()
                                                .map(c -> String.format(
                                                                "Nome: %s | Categoria: %s | Descrição: %s | Preço: %.2f | Avaliação: %.1f",
                                                                c.getName(), c.getCategory(), c.getDescription(),
                                                                c.getPrice(), c.getPreview()))
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
                                throw new IOException(
                                                "403 Forbidden — Possível erro de autenticação ou limitação de requisições.");
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
