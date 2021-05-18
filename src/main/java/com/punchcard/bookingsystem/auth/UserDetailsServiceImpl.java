package com.punchcard.bookingsystem.auth;

import com.punchcard.bookingsystem.repositories.AdminRepository;
import com.punchcard.bookingsystem.tables.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private AdminRepository adminRepository;

    @Autowired
    public UserDetailsServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Admin> optionalAdmin = adminRepository.findByName(username);
        if (optionalAdmin.isEmpty()) {
            throw new UsernameNotFoundException("Username " + username + " could not be found.");
        }
        Admin a = optionalAdmin.get();

        return new User(a.getName(), a.getPassword(), new ArrayList<>());
    }

}
