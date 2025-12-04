package com.example.NeuroRec.service;

import com.example.NeuroRec.model.Course;
import com.example.NeuroRec.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {
        this.repository = repository;
    }

    public List<Course> buscarCursos(String categoria, String intencao) {
        System.out.println("Buscando cursos na categoria: " + categoria);

        List<Course> cursos = repository.findByCategoryContainingIgnoreCase(categoria);

        if (cursos.isEmpty()) {
            System.out.println("Nenhum curso encontrado na categoria '" + categoria
                    + "'. Tentando buscar por palavra-chave...");

        }

        if (cursos.isEmpty()) {
            System.out.println("Nenhum curso encontrado com base na intenção: " + intencao);
        } else {
            System.out.println("Oh " + cursos.size() + " curso(s) encontrado(s).");
        }

        return cursos;
    }
}
