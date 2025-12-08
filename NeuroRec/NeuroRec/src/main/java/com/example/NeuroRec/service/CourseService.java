package com.example.NeuroRec.service;

import com.example.NeuroRec.model.Course;
import com.example.NeuroRec.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
            System.out.println("Oh" + cursos.size() + " curso(s) encontrado(s).");
        }

        return cursos;
    }

    public List<Course> listAll() {
        return repository.findAll();
    }

    public Optional<Course> findById(Long id) {
        return repository.findById(id);
    }

    public Course create(Course course) {
        course.setId(null);
        return repository.save(course);
    }

    public Optional<Course> update(Long id, Course payload) {
        return repository.findById(id).map(existing -> {
            existing.setName(payload.getName());
            existing.setCategory(payload.getCategory());
            existing.setDescription(payload.getDescription());
            existing.setPrice(payload.getPrice());
            existing.setPreview(payload.getPreview());
            return repository.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
