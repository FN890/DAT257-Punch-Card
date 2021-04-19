package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.services.BookingService;
import com.punchcard.bookingsystem.tables.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(path = "/bydate", produces = "application/json")
    public List<Booking> getBetweenDates(@RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
                                         @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {
        //TODO: Update and/or move
        return null;
    }

}
