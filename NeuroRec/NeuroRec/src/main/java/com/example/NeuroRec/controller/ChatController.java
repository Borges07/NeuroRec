package com.example.NeuroRec.controller;

import com.example.NeuroRec.dto.ChatRequest;
import com.example.NeuroRec.dto.ChatResponse;
import com.example.NeuroRec.model.Course;
import com.example.NeuroRec.service.CourseService;
import com.example.NeuroRec.service.GroqService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:8080")
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

        String intencao = groqService.extrairIntencao(request.getMessage());
        System.out.println("Intenção detectada pela IA: " + intencao);

        String categoria = identificarCategoria(intencao);
        System.out.println("Categoria detectada: " + categoria);

        List<Course> cursos = courseService.buscarCursos(categoria, intencao);
        System.out.println("Cursos encontrados: " + cursos.size());

        String resposta = groqService.gerarRespostaNatural(cursos);

        System.out.println("Resposta final gerada com sucesso.\n");
        return new ChatResponse(resposta, cursos);
    }

    private String identificarCategoria(String intencao) {
        String texto = intencao.toLowerCase();

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
                || texto.contains("python")
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

        return "geral";
    }

}
