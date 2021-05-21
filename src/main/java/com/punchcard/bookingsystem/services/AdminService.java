package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.bodies.LoginRequest;
import com.punchcard.bookingsystem.repositories.AdminRepository;
import com.punchcard.bookingsystem.tables.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity createAdmin(Admin admin) {
        String password = admin.getPassword();
        admin.setPassword(passwordEncoder.encode(password));
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin skapad");
    }

}
