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

@Configuration
public class BookingConfig {

    @Bean
    CommandLineRunner commandLineRunner2(BookingRepository bookingRepository, ActivityRepository activityRepository, CustomerRepository customerRepository, ReservationRepository reservationRepository) {
        return args -> {

            Customer customer = new Customer("0740123456", "John");
            customerRepository.save(customer);

            Customer customer1 = new Customer("0740123336", "Greg");
            customerRepository.save(customer1);

            Activity activityStuga = new Activity("Stuga", 4000, 4, false);
            activityRepository.save(activityStuga);

            Activity activityBad = new Activity("Badtunna", 1500, 4, true);
            activityRepository.save(activityBad);

            Activity activityVattenSkidor = new Activity("VattenSkidor", 500, 4, true);
            activityRepository.save(activityVattenSkidor);

            Booking booking3 = new Booking(customer, 10);
            booking3.setDescription("Vill boka stugan i en vecka.");
            booking3.setResponsible("Gustav");

            Booking booking = new Booking(customer, 10);
            booking.setDescription("En skolklass med ca 10 intresserade av skidåkning.");
            booking.setResponsible("Daniel");

            Booking booking2 = new Booking(customer, 11);
            booking2.setDescription("En skolklass med ca 11 intresserade av skidåkning.");
            booking2.setResponsible("Daniel");

            Booking booking1 = new Booking(customer1, 8);
            booking1.setDescription("Vill boka badtunnan");
            booking1.setResponsible("Richard");

            LocalDateTime start = LocalDateTime.now();
            LocalDateTime end = LocalDateTime.now().plusWeeks(1);

            Reservation reservationStuga = new Reservation(
                    start,
                    end,
                    activityStuga,
                    booking3);

            Reservation reservationBad = new Reservation(
                    LocalDateTime.of(2021, 5, 24, 21,0),
                    LocalDateTime.of(2021, 5, 24, 22,0),
                    activityBad,
                    booking1);

            Reservation reservationSkidor = new Reservation(
                    LocalDateTime.of(2021, 4, 24, 14,0),
                    LocalDateTime.of(2021, 4, 24, 16,0),
                    activityVattenSkidor,
                    booking);

            Reservation reservationSkidor2 = new Reservation(
                    LocalDateTime.of(2021, 4, 16, 14,0),
                    LocalDateTime.of(2021, 4, 18, 16,0),
                    activityVattenSkidor,
                    booking2);


            bookingRepository.save(booking);
            bookingRepository.save(booking1);
            bookingRepository.save(booking2);
            bookingRepository.save(booking3);
            reservationRepository.save(reservationStuga);
            reservationRepository.save(reservationBad);
            reservationRepository.save(reservationSkidor);
            reservationRepository.save(reservationSkidor2);

        };
    }

}
