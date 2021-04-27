package com.punchcard.bookingsystem.testConfigs;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ActivityConfig {

    @Bean
    CommandLineRunner commandLineRunner3(ActivityRepository activityRepository) {
        return args -> {
            Activity bastu = new Activity("Bastu", 500, 7, false);
            activityRepository.saveAll(List.of(bastu));

        };
    }
}
