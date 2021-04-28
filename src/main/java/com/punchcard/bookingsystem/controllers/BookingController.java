package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.services.BookingService;
import com.punchcard.bookingsystem.tables.Booking;
import com.punchcard.bookingsystem.tables.Reservation;
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
    public Booking getById(@PathVariable("id") Long id) {
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

    @PostMapping
    public void addNewBooking(@RequestBody Booking booking) {
        bookingService.addNewBooking(booking);
    }

    @PutMapping(path = "/{id}")
    public void updateBooking(@PathVariable("id") Long id,
                              @RequestParam(required = false) List<Reservation> reservations,
                              @RequestParam(required = false) String description,
                              @RequestParam(required = false) String responsible,
                              @RequestParam(required = false) boolean paid) {
        bookingService.updateBooking(id, reservations, description, responsible, paid);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteBooking(@PathVariable("id") Long id) {
        bookingService.deleteBooking(id);
    }

}
