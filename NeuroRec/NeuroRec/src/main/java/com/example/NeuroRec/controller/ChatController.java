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
    private final CourseService productService;

    public ChatController(GroqService groqService, CourseService productService) {
        this.groqService = groqService;
        this.productService = productService;
    }

    @PostMapping
    public ChatResponse processarMensagem(@RequestBody ChatRequest request) throws IOException {
        String intencao = groqService.extrairIntencao(request.getMessage());

        String categoria = intencao.matches("(?i).*programa.*") ? "programação" :
                           intencao.matches("(?i).*design.*") ? "design" : "geral";

        List<Course> cursos = productService.buscarCursos(categoria, intencao);
        String resposta = groqService.gerarRespostaNatural(cursos);

        return new ChatResponse(resposta, cursos);
    }
}

