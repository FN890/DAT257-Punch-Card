package com.punchcard.bookingsystem.testConfigs;

import com.punchcard.bookingsystem.repositories.AdminRepository;
import com.punchcard.bookingsystem.services.AdminService;
import com.punchcard.bookingsystem.tables.Admin;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminConfig {

    @Bean
    CommandLineRunner commandLineRunner4(AdminService adminService) {
        return args -> {

            Admin admin = new Admin("admin", "admin");
            adminService.createAdmin(admin);

        };
    }

}
