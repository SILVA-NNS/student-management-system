package com.nimna.student_management_system.controller;

import com.nimna.student_management_system.model.Student;
import com.nimna.student_management_system.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        // Validate email uniqueness
        if (student.getEmail() != null && studentRepository.findByEmail(student.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email address already registered");
        }

        // Auto-generate studentId if not provided
        if (student.getStudentId() == null || student.getStudentId().trim().isEmpty()) {
            long count = studentRepository.count();
            // Loop until we find a unique ID (to avoid conflicts on deleted records)
            String generatedId;
            do {
                count++;
                generatedId = "STU" + String.format("%04d", count);
            } while (studentRepository.findByStudentId(generatedId).isPresent());
            student.setStudentId(generatedId);
        } else if (studentRepository.findByStudentId(student.getStudentId()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Student ID already exists");
        }

        // Set default registration date if null
        if (student.getRegistrationDate() == null) {
            student.setRegistrationDate(LocalDate.now());
        }

        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    @GetMapping
    public ResponseEntity<List<Student>> getStudents(@RequestParam(value = "search", required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            List<Student> searchResults = studentRepository
                    .findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search);
            return ResponseEntity.ok(searchResults);
        }
        return ResponseEntity.ok(studentRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable String id) {
        Optional<Student> studentOpt = studentRepository.findById(id);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }
        return ResponseEntity.ok(studentOpt.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable String id, @RequestBody Student studentDetails) {
        Optional<Student> studentOpt = studentRepository.findById(id);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }

        Student existingStudent = studentOpt.get();

        // Validate email uniqueness if changed
        if (studentDetails.getEmail() != null && !studentDetails.getEmail().equals(existingStudent.getEmail())) {
            if (studentRepository.findByEmail(studentDetails.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email address already in use");
            }
        }

        // Update fields
        existingStudent.setFullName(studentDetails.getFullName());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setPhoneNumber(studentDetails.getPhoneNumber());
        existingStudent.setCourse(studentDetails.getCourse());
        existingStudent.setAge(studentDetails.getAge());
        existingStudent.setGender(studentDetails.getGender());
        existingStudent.setAddress(studentDetails.getAddress());
        
        if (studentDetails.getRegistrationDate() != null) {
            existingStudent.setRegistrationDate(studentDetails.getRegistrationDate());
        }

        Student updatedStudent = studentRepository.save(existingStudent);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable String id) {
        Optional<Student> studentOpt = studentRepository.findById(id);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }
        studentRepository.deleteById(id);
        return ResponseEntity.ok().body("Student deleted successfully");
    }
}
