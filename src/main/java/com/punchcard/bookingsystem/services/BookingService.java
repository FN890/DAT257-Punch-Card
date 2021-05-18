package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.bodies.PreBooking;
import com.punchcard.bookingsystem.bodies.PreBookingResponse;
import com.punchcard.bookingsystem.repositories.BookingRepository;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Booking;
import com.punchcard.bookingsystem.tables.Customer;
import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ReservationService reservationService;
    private final CustomerService customerService;
    private final ActivityService activityService;
    private final EmailService emailService;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ReservationService reservationService, CustomerService customerService, ActivityService activityService, EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.reservationService = reservationService;
        this.customerService = customerService;
        this.activityService = activityService;
        this.emailService = emailService;
    }

    public ResponseEntity getAllBookings() {
        List<Booking> bookingList = bookingRepository.findAll();
        bookingList.sort(new Comparator<Booking>() {
            @Override
            public int compare(Booking o1, Booking o2) {
                return (int) (o2.getId() - o1.getId());
            }
        });
        return ResponseEntity.ok(bookingList);
    }

    public ResponseEntity getArchived() {
        return ResponseEntity.ok(bookingRepository.findArchived());
    }

    public ResponseEntity getNotArchived() {
        return ResponseEntity.ok(bookingRepository.findNotArchived());
    }

    public List<Booking> getByCustomerPhone(String phone) {
        if (bookingRepository.findByCustomerPhoneNr(phone).isEmpty()) {
            throw new IllegalStateException("Booking with customer phone number " + phone + " does not exists.");
        }

        return bookingRepository.findByCustomerPhoneNr(phone);
    }

    public List<Booking> getByResponsible(String responsible) {
        if (bookingRepository.findByResponsible(responsible).isEmpty()) {
            throw new IllegalStateException("Booking with responsible " + responsible + " does not exists.");
        }
        return bookingRepository.findByResponsible(responsible);
    }

    public Booking getById(Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isPresent()) {
            return booking.get();
        }

        throw new IllegalStateException("Booking with id " + id + " does not exists.");
    }

    public List<Booking> getByCustomerEmail(String email) {
        if (bookingRepository.findByCustomerEmail(email).isEmpty()) {
            throw new IllegalStateException("Booking customer email " + email + " does not exists.");
        }
        return bookingRepository.findByCustomerEmail(email);
    }

    public ResponseEntity getByCustomerName(String name) {
        if (bookingRepository.findByCustomerName(name).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No booking with customer " + name + " exists");
        }
        return ResponseEntity.ok(bookingRepository.findByCustomerName(name));
    }

    public PreBookingResponse calculatePreBooking(List<PreBooking> preBookings) {
        int total = 0;
        Map<String, Integer> activityPrices = new HashMap<>();
        for (PreBooking p : preBookings) {
            Activity a = (Activity) activityService.getActivityById(p.getActivityId()).getBody();
            Reservation r = new Reservation(p.getStartTime(), p.getEndTime(), a);
            total += r.getPrice();

            if (activityPrices.containsKey(a.getName())) {

                activityPrices.put(a.getName(), activityPrices.get(a.getName()) + r.getPrice());
            } else { activityPrices.put(a.getName(), r.getPrice()); }

        }

        return new PreBookingResponse(total, activityPrices);
    }

    public ResponseEntity addNewBooking(Booking booking) {
        Booking newBooking = new Booking(booking.getCustomer(), booking.getGroupSize());

        Customer customer;

        newBooking.setResponsible(booking.getResponsible());
        newBooking.setDescription(booking.getDescription());
        newBooking.setPaid(booking.isPaid());
        newBooking.setPrice(booking.getPrice());

        List<Reservation> reservations = new ArrayList();

        for (Reservation r : booking.getReservations()) {
            if (!reservationService.isAvailable(r)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Överlappande datum med aktivitet " + r.getActivity().getName());
            }
            Activity activity = (Activity) activityService.getActivityById(r.getActivity().getId()).getBody();
            Reservation reservation = new Reservation(r.getStartTime(), r.getEndTime(), activity, newBooking);
            reservations.add(reservation);
        }

        try {
            customerService.addNewCustomer(booking.getCustomer());
            customer = booking.getCustomer();
        } catch (IllegalStateException e) {
            Optional<Customer> optionalCustomer = customerService.getCustomerByPhone(booking.getCustomer().getPhoneNr());
            customer = optionalCustomer.get();
        }

        newBooking.setCustomer(customer);
        newBooking.setReservations(reservations);
        try {
            emailService.sendEmail(customer.getEmail(), reservations);
            bookingRepository.save(newBooking);
            return ResponseEntity.ok("Bokning genomförd och mail skickat.");
        } catch (MailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Fel med att skicka mail, kolla att adressen stämmer.");
        }
    }

    @Transactional
    public ResponseEntity updateBooking(Long id, Booking newBooking) {
        Booking oldBooking = bookingRepository.findById(id).orElseThrow(() -> new IllegalStateException(
                "Booking with id " + id + " does not exists"));

        if (newBooking.getReservations() != null && !newBooking.getReservations().isEmpty() && !newBooking.getReservations().equals(oldBooking.getReservations())) {
            for (Reservation reservation : oldBooking.getReservations()) {
                reservationService.deleteReservationById(reservation.getId());
            }

            List<Reservation> reservationList = new ArrayList<>();

            for (Reservation reservation : newBooking.getReservations()) {
                if (!reservationService.isAvailable(reservation)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            "Överlappande reservation: " + reservation.getActivity().getName() + " på datum: " + reservation.getStartTime() + "-" + reservation.getEndTime());
                }
                Reservation r = new Reservation(reservation.getStartTime(), reservation.getEndTime(), reservation.getActivity(), newBooking);
                reservationList.add(r);
            }
            oldBooking.setReservations(reservationList);
        }

        if (newBooking.getDescription() != null && !newBooking.getDescription().equals(oldBooking.getDescription())) {
            oldBooking.setDescription(newBooking.getDescription());
        }

        if (newBooking.getResponsible() != null && !newBooking.getResponsible().equals(oldBooking.getResponsible())) {
            oldBooking.setResponsible(newBooking.getResponsible());
        }

        if (newBooking.isPaid() != oldBooking.isPaid()) {
            oldBooking.setPaid(newBooking.isPaid());
        }

        if (newBooking.getPrice() != oldBooking.getPrice()) {
            oldBooking.setPrice(newBooking.getPrice());
        }

        if (newBooking.isArchived() != oldBooking.isArchived()) {
            oldBooking.setArchived(newBooking.isArchived());
        }

        if (newBooking.getCustomer() != oldBooking.getCustomer()) {
            customerService.updateCustomer(oldBooking.getCustomer().getId(), newBooking.getCustomer());
        }

        bookingRepository.save(oldBooking);

        return ResponseEntity.ok("Bokning uppdaterad");
    }

    public ResponseEntity deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bokning med id " + id + " hittades inte.");
        }
        bookingRepository.deleteById(id);
        return ResponseEntity.ok("Bokning med id " + id + " är borttagen.");
    }
}
