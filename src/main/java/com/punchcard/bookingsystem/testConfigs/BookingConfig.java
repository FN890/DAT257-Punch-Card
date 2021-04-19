package com.punchcard.bookingsystem.testConfigs;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.repositories.BookingRepository;
import com.punchcard.bookingsystem.repositories.CustomerRepository;
import com.punchcard.bookingsystem.repositories.ReservationRepository;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Booking;
import com.punchcard.bookingsystem.tables.Customer;
import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class BookingConfig {

    @Bean
    CommandLineRunner commandLineRunner2(BookingRepository bookingRepository, ActivityRepository activityRepository, CustomerRepository customerRepository, ReservationRepository reservationRepository) {
        return args -> {
            //java.time.LocalDateTime startTime, LocalDateTime endTime, Activity activity, Customer customer
            LocalDateTime startTime = LocalDateTime.of(2021, 4, 15, 12,0);
            LocalDateTime endTime = LocalDateTime.of(2021, 4, 20, 12,0);

            Customer customer = new Customer("0740123456", "John");
            customerRepository.save(customer);

            Activity activity = new Activity("Stuga", 1000, 4);
            activityRepository.save(activity);

            Booking booking = new Booking(customer, 10);
            Reservation reservation = new Reservation(startTime, endTime, activity, booking);


            bookingRepository.save(booking);
            reservationRepository.save(reservation);
        };
    }

}
