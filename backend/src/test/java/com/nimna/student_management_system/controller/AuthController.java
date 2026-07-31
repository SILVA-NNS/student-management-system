package com.nimna.student_management_system.controller;

import com.nimna.student_management_system.dto.LoginRequest;
import com.nimna.student_management_system.dto.LoginResponse;
import com.nimna.student_management_system.model.Admin;
import com.nimna.student_management_system.repository.AdminRepository;
import com.nimna.student_management_system.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(AdminRepository adminRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(request.getEmail());

        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        Admin admin = adminOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(admin.getEmail());
        return ResponseEntity.ok(new LoginResponse(token));
    }
}