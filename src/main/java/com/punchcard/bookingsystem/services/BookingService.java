package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.BookingRepository;
import com.punchcard.bookingsystem.tables.Booking;
import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ReservationService reservationService;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ReservationService reservationService) {
        this.bookingRepository = bookingRepository;
        this.reservationService = reservationService;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getByCustomerPhone(String phone) {
        return bookingRepository.findByCustomerPhone(phone);
    }

    public List<Booking> getByResponsible(String responsible) {
        return bookingRepository.findByResponsible(responsible);
    }

    public Booking getById(Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isPresent()) {
            return booking.get();
        }

        throw new IllegalStateException("Booking with id " + id + " does not exists.");
    }

    public void addNewBooking(Booking booking) {
        Booking newBooking = new Booking(booking.getCustomer(), booking.getGroupSize());
        newBooking.setResponsible(booking.getResponsible());
        newBooking.setDescription(booking.getDescription());
        List<Reservation> reservations = new ArrayList();
        for (Reservation r : booking.getReservations()) {
            if (!reservationService.isAvailable(r)) {
                throw new IllegalStateException("Overlapping reservation " + r.getActivity() + " in this booking.");
            }
            Reservation reservation = new Reservation(r.getStartTime(), r.getEndTime(), r.getActivity(), newBooking);
            reservations.add(reservation);
        }
        newBooking.setReservations(reservations);
        bookingRepository.save(newBooking);
    }

    @Transactional
    public void updateBooking(Long id, List<Reservation> reservations, String description, String responsible, boolean paid, Integer price) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new IllegalStateException(
                "Booking with id " + id + " does not exists"));

        if (reservations != null && !reservations.isEmpty() && !reservations.equals(booking.getReservations())) {
            booking.setReservations(reservations);
        }

        if (description != null && !description.equals(booking.getDescription())) {
            booking.setDescription(description);
        }

        if (responsible != null && !responsible.equals(booking.getResponsible())) {
            booking.setResponsible(responsible);
        }

        if (paid != booking.isPaid()) {
            booking.setPaid(paid);
        }

        if (price != null && price != booking.getPrice()) {
            booking.setPrice(price);
        }

        bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new IllegalStateException("Booking with id " + id + " does not exists.");
        }
        bookingRepository.deleteById(id);
    }
}
