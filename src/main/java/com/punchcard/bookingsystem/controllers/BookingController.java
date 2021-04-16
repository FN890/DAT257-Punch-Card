package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.services.BookingService;
import com.punchcard.bookingsystem.tables.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/booking")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping(produces = "application/json")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public Booking getById(@PathVariable long id) {
        return bookingService.getById(id);
    }

    @GetMapping(path = "/bydate/{from}/{to}", produces = "application/json")
    public List<Booking> getBetweenDates(@PathVariable(value = "from") @DateTimeFormat(pattern = "yyyy-mm-dd") LocalDate fromDate,
                                         @PathVariable(value = "to") @DateTimeFormat(pattern = "yyyy-mm-dd") LocalDate toDate) {
        return bookingService.getByDate(fromDate, toDate);
    }

}
