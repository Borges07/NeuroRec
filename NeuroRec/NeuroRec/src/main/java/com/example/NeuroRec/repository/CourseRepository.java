package com.example.NeuroRec.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.NeuroRec.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByCategoryContainingIgnoreCase(String category);

    @Query("SELECT c FROM Course c WHERE LOWER(c.category) LIKE LOWER(CONCAT('%', :category, '%')) ORDER BY c.preview DESC")
    List<Course> findByCategoryOrderByPreviewDesc(@Param("category") String category);

    @Query("SELECT c FROM Course c WHERE LOWER(c.category) LIKE LOWER(CONCAT('%', :category, '%')) ORDER BY c.price ASC")
    List<Course> findByCategoryOrderByPriceAsc(@Param("category") String category);

    @Query("SELECT c FROM Course c WHERE LOWER(c.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    List<Course> findByDescriptionContainingIgnoreCase(@Param("description") String description);

    @Query("SELECT c FROM Course c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Course> findByNameContainingIgnoreCase(@Param("name") String name);
}
