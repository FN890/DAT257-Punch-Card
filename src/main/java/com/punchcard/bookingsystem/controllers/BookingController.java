package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.bodies.PreBooking;
import com.punchcard.bookingsystem.bodies.PreBookingResponse;
import com.punchcard.bookingsystem.services.BookingService;
import com.punchcard.bookingsystem.tables.Booking;
import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping(path = "/archived")
    public List<Booking> getArchived() {
        return bookingService.getArchived();
    }

    @GetMapping(path = "/notarchived")
    public List<Booking> getNotArchived() {
        return bookingService.getNotArchived();
    }

    @GetMapping(path = "/{id}")
    public Booking getById(@PathVariable("id") Long id) {
        return bookingService.getById(id);
    }

    @GetMapping(path = "/customer/phone/{phoneNr}")
    public List<Booking> getByCustomerPhone(@PathVariable String phoneNr) {
        return bookingService.getByCustomerPhone(phoneNr);
    }

    @GetMapping(path = "/customer/email/{email}")
    public List<Booking> getByCustomerEmail(@PathVariable String email) {
        return bookingService.getByCustomerEmail(email);
    }

    @GetMapping(path = "/customer/name/{name}")
    public ResponseEntity getByCustomerName(@PathVariable String name) {
        return bookingService.getByCustomerName(name);
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

    @PostMapping(path = "/pre")
    public PreBookingResponse calculatePreBooking(@RequestBody List<PreBooking> preBookings) {
        return bookingService.calculatePreBooking(preBookings);
    }

    @PostMapping
    public ResponseEntity addNewBooking(@RequestBody Booking booking) {
        return bookingService.addNewBooking(booking);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity updateBooking(@PathVariable("id") Long id, @RequestBody Booking booking) {
        return bookingService.updateBooking(id, booking);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteBooking(@PathVariable("id") Long id) {
        bookingService.deleteBooking(id);
    }

}
