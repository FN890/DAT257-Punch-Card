package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.auth.JwtUtils;
import com.punchcard.bookingsystem.bodies.JwtResponse;
import com.punchcard.bookingsystem.bodies.LoginRequest;
import com.punchcard.bookingsystem.services.AdminService;
import com.punchcard.bookingsystem.tables.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/admin")
public class AdminController {


    private final AdminService adminService;

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


    @Autowired
    public AdminController(AdminService adminService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.adminService = adminService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping
    public List<Admin> getAllAccounts() {
        return adminService.getAllAccounts();
    }

    @RequestMapping(path = "/login")
    public ResponseEntity authAdmin(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword(), new ArrayList<>())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
    }

    @PostMapping(path = "/create")
    public ResponseEntity createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @DeleteMapping(path = "/{name}")
    public void deleteAdmin(@PathVariable String name) {
        adminService.deleteAdmin(name);
    }


}
