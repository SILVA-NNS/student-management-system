package com.nimna.student_management_system.repository;

import com.nimna.student_management_system.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByStudentId(String studentId);
    Optional<Student> findByEmail(String email);
    List<Student> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
}
