package com.example.NeuroRec.controller;

import com.example.NeuroRec.dto.ChatRequest;
import com.example.NeuroRec.dto.ChatResponse;
import com.example.NeuroRec.model.Course;
import com.example.NeuroRec.service.CourseService;
import com.example.NeuroRec.service.GroqService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173"})
public class ChatController {

    private final GroqService groqService;
    private final CourseService courseService;

    public ChatController(GroqService groqService, CourseService courseService) {
        this.groqService = groqService;
        this.courseService = courseService;
    }

    @PostMapping
    public ChatResponse processarMensagem(@RequestBody ChatRequest request) throws IOException {
        System.out.println("\n=== [Nova Requisição de Chat] ===");
        System.out.println("Mensagem recebida: " + request.getMessage());

        // 1) Pede a intenção estruturada da IA
        String intencaoEstruturada = groqService.extrairIntencao(request.getMessage());
        System.out.println("Intenção (bruta) detectada pela IA: " + intencaoEstruturada);

        // 2) Parse da intenção: extrair categoria e filtro
        String categoria = "Geral";
        String filtro = "nenhum";

        // regex simples para capturar categoria e filtro (case-insensitive)
        Pattern p = Pattern.compile("(?i)categoria\\s*=\\s*([^;]+)\\s*;\\s*filtro\\s*=\\s*(\\S+)");
        Matcher m = p.matcher(intencaoEstruturada);
        if (m.find()) {
            categoria = m.group(1).trim();
            filtro = m.group(2).trim().toLowerCase();
            System.out.println("Parse OK -> categoria: " + categoria + ", filtro: " + filtro);
        } else {
            // fallback: tentar heurística local (se quiser)
            System.err.println("Falha no parse da intenção estruturada; usando fallback heurístico.");
            // usa identificarCategoria como fallback simples
            categoria = identificarCategoria(request.getMessage());
            filtro = request.getMessage().toLowerCase().contains("barato") ? "barato" : "nenhum";
            System.out.println("Fallback -> categoria: " + categoria + ", filtro: " + filtro);
        }

        // 3) Monta um typeFilter compatível com o CourseService atual:
        //    evita alterar CourseService — juntamos filtro + mensagem original
        String typeFilter = filtro + " " + request.getMessage();
        System.out.println("? Buscando cursos na categoria: " + categoria + " com filtro: " + filtro);

        // 4) Busca no banco
        List<Course> cursos = courseService.buscarCursos(categoria, typeFilter);
        System.out.println("Cursos encontrados: " + cursos.size());

        // 5) Gera resposta natural via Groq (mesma lógica que já existia)
        String resposta = groqService.gerarRespostaNatural(cursos);

        System.out.println("Resposta final gerada com sucesso.\n");
        return new ChatResponse(resposta, cursos);
    }

    /**
     * Heurística local (fallback) para identificar categoria pelo texto bruto.
     * Mantive a mesma lógica que você já usava (apenas como fallback).
     */
    private String identificarCategoria(String intencao) {
        String texto = intencao == null ? "" : intencao.toLowerCase();

        // Data Science primeiro (python pode aparecer em ambos)
        if (texto.contains("dados")
                || texto.contains("data")
                || texto.contains("machine learning")
                || texto.contains("inteligência artificial")
                || texto.contains("inteligencia artificial")
                || texto.contains("ia")
                || texto.contains("análise")
                || texto.contains("analise")
                || texto.contains("estatística")
                || texto.contains("estatistica")
                || texto.contains("pandas")
                || texto.contains("python")) {
            return "Data Science";
        }

        if (texto.contains("programa")
                || texto.contains("programação")
                || texto.contains("programacao")
                || texto.contains("código")
                || texto.contains("codigo")
                || texto.contains("codar")
                || texto.contains("dev")
                || texto.contains("desenvolvedor")
                || texto.contains("desenvolver")
                || texto.contains("desenvolvimento")
                || texto.contains("software")
                || texto.contains("aplicativo")
                || texto.contains("app")
                || texto.contains("site")
                || texto.contains("sistema")
                || texto.contains("backend")
                || texto.contains("back-end")
                || texto.contains("frontend")
                || texto.contains("front-end")
                || texto.contains("fullstack")
                || texto.contains("full-stack")
                || texto.contains("java")
                || texto.contains("javascript")
                || texto.contains("js")
                || texto.contains("node")
                || texto.contains("react")
                || texto.contains("spring")
                || texto.contains("php")
                || texto.contains("flutter")
                || texto.contains("mobile")) {
            return "Programming";
        }

        if (texto.contains("design")
                || texto.contains("designer")
                || texto.contains("ui")
                || texto.contains("ux")
                || texto.contains("gráfico")
                || texto.contains("grafico")
                || texto.contains("figma")
                || texto.contains("photoshop")
                || texto.contains("interface")
                || texto.contains("prototipagem")
                || texto.contains("criativo")) {
            return "Design";
        }

        return "geral";
    }
}
