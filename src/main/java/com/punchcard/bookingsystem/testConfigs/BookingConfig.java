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

            Customer customer = new Customer("0740123456", "John");
            customerRepository.save(customer);

            Activity activityStuga = new Activity("Stuga", 4000, 4);
            activityRepository.save(activityStuga);

            Activity activityBad = new Activity("Badtunna", 1500, 4);
            activityRepository.save(activityBad);

            Activity activityVattenSkidor = new Activity("VattenSkidor", 500, 4);
            activityRepository.save(activityVattenSkidor);

            Booking booking = new Booking(customer, 10);

            Reservation reservationStuga = new Reservation(
                    LocalDateTime.of(2021, 4, 23, 17,0),
                    LocalDateTime.of(2021, 4, 25, 12,0),
                    activityStuga,
                    booking);

            Reservation reservationBad = new Reservation(
                    LocalDateTime.of(2021, 4, 24, 21,0),
                    LocalDateTime.of(2021, 4, 24, 22,0),
                    activityBad,
                    booking);

            Reservation reservationSkidor = new Reservation(
                    LocalDateTime.of(2021, 4, 24, 14,0),
                    LocalDateTime.of(2021, 4, 24, 16,0),
                    activityVattenSkidor,
                    booking);


            bookingRepository.save(booking);
            reservationRepository.save(reservationStuga);
            reservationRepository.save(reservationBad);
            reservationRepository.save(reservationSkidor);
        };
    }

}
