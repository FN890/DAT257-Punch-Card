package com.punchcard.bookingsystem.testConfigs;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.tables.Activity;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ActivityConfig {

    @Bean
    CommandLineRunner commandLineRunner(ActivityRepository activityRepository) {
        return args -> {
            Activity bastu = new Activity("Bastu", 500, 7);

            activityRepository.saveAll(List.of(bastu));
        };
    }
}
