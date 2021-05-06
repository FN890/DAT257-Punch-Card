package com.punchcard.bookingsystem.testConfigs;

import com.punchcard.bookingsystem.repositories.CustomerRepository;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CustomerConfig {

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository repository) {
        return args -> {
            Customer viktor = new Customer("0735130511", "Viktor Berggren", "vikke@bahnhof.se");
            Customer gaben = new Customer("0751234567", "John Doe", "john.doe@gmail.com");

            repository.saveAll(List.of(viktor, gaben));
        };
    }
}
