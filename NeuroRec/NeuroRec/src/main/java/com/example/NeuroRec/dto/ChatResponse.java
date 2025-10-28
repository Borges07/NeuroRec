package com.example.NeuroRec.dto;

import com.example.NeuroRec.model.Course;
import java.util.List;

public class ChatResponse {
    private String resposta;
    private List<Course> products;

    public ChatResponse(String resposta, List<Course> products) {
        this.resposta = resposta;
        this.products = products;
    }

    public String getResposta() {
        return resposta;
    }

    public List<Course> getCursos() {
        return products;
    }
}
