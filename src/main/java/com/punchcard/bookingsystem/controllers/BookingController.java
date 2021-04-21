package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.services.BookingService;
import com.punchcard.bookingsystem.tables.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/booking", produces = "application/json")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping(path = "/{id}")
    public Booking getById(@PathVariable long id) {
        return bookingService.getById(id);
    }

    @GetMapping(path = "/customer/{phone}")
    public List<Booking> getByCustomerPhone(@PathVariable String phone) {
        return bookingService.getByCustomerPhone(phone);
    }

    @GetMapping(path = "/responsible/{responsible}")
    public List<Booking> getByResponsible(@PathVariable String responsible) {
        return bookingService.getByResponsible(responsible);
    }

    //TODO: Update and/or move
    @GetMapping(path = "/bydate")
    public List<Booking> getBetweenDates(@RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
                                         @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {

        return null;
    }

}
