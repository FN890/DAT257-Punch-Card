package com.punchcard.bookingsystem.testConfigs;

import com.punchcard.bookingsystem.repositories.BookingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BookingConfig {

    CommandLineRunner commandLineRunner(BookingRepository repository) {
        return args -> {


        };
    }

}
