package com.nimna.student_management_system.config;

import com.nimna.student_management_system.model.Admin;
import com.nimna.student_management_system.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String defaultEmail = "admin@sms.com";

        if (adminRepository.findByEmail(defaultEmail).isEmpty()) {
            Admin admin = new Admin();
            admin.setEmail(defaultEmail);
            admin.setPassword(passwordEncoder.encode("admin123")); // change after first login in real use
            adminRepository.save(admin);
            System.out.println("Seeded default admin: " + defaultEmail + " / admin123");
        }
    }
}