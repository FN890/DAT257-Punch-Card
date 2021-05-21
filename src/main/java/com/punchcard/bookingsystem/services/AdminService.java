package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.bodies.LoginRequest;
import com.punchcard.bookingsystem.repositories.AdminRepository;
import com.punchcard.bookingsystem.tables.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Admin> getAllAccounts() {
        return adminRepository.findAll();
    }

    public ResponseEntity createAdmin(Admin admin) {
        String password = admin.getPassword();
        admin.setPassword(passwordEncoder.encode(password));
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin skapad");
    }

    public ResponseEntity deleteAdmin(String name) {
        Optional<Admin> oa = adminRepository.findByName(name);
        if (oa.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }

        adminRepository.delete(oa.get());
        return ResponseEntity.ok("Admin deleted");
    }

}
