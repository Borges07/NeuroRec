package com.example.NeuroRec.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.NeuroRec.model.Course;
import com.example.NeuroRec.repository.CourseRepository;

@Service
public class CourseService {

    private final CourseRepository productRepository;

    public CourseService(CourseRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Course> buscarCursos(String category, String typeFilter) {
        if (typeFilter.contains("avalia")) {
            return productRepository.findByCategoryOrderByPreviewDesc(category);

        } else if (typeFilter.contains("preço") || typeFilter.contains("barato")) {
            return productRepository.findByCategoryOrderByPriceAsc(category);

        } else {
            return productRepository.findByCategoryContainingIgnoreCase(category);

        }
    }
}
