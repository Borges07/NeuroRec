package com.example.NeuroRec.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.NeuroRec.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCategoryContainingIgnoreCase(String category);

    @Query("SELECT p FROM Course p WHERE LOWER(p.category) LIKE LOWER(CONCAT('%', :category, '%')) ORDER BY p.preview DESC")
    List<Course> findByCategoryOrderByPreviewDesc(@Param("category") String category);

    @Query("SELECT p FROM Course p WHERE LOWER(p.category) LIKE LOWER(CONCAT('%', :category, '%')) ORDER BY p.price ASC")
    List<Course> findByCategoryOrderByPriceAsc(@Param("category") String category);
}
