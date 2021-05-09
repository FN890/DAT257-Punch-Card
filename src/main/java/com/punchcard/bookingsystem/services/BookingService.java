package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.bodies.PreBooking;
import com.punchcard.bookingsystem.repositories.BookingRepository;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Booking;
import com.punchcard.bookingsystem.tables.Customer;
import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Booking> getAllBookings() {
        List<Booking> bookingList = bookingRepository.findAll();
        bookingList.sort(new Comparator<Booking>() {
            @Override
            public int compare(Booking o1, Booking o2) {
                return (int) (o2.getId() - o1.getId());
            }
        });
        return bookingList;
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

    public List<Booking> getByCustomerName(String name) {
        if (bookingRepository.findByCustomerName(name).isEmpty()) {
            throw new IllegalStateException("Booking customer name " + name + " does not exists.");
        }
        return bookingRepository.findByCustomerName(name);
    }

    public Map<String, Integer> calculatePreBooking(List<PreBooking> preBookings) {
        int total = 0;
        for (PreBooking p : preBookings) {
            Activity a = activityService.getActivityByName(p.getActivityName());
            Reservation r = new Reservation(p.getStartTime(), p.getEndTime(), a);
            total += r.getPrice();
        }
        Map<String, Integer> value = new HashMap<>();
        value.put("price", total);
        return value;
    }

    public void addNewBooking(Booking booking) {
        Booking newBooking = new Booking(booking.getCustomer(), booking.getGroupSize());

        Customer customer = new Customer();

        Activity activity = new Activity();

        newBooking.setResponsible(booking.getResponsible());
        newBooking.setDescription(booking.getDescription());

        List<Reservation> reservations = new ArrayList();

        for (Reservation r : booking.getReservations()) {
            activity = activityService.getActivityByName(r.getActivity().getName());
            if (!reservationService.isAvailable(r)) {
                throw new IllegalStateException("Overlapping reservation " + r.getActivity().getName() + " in this booking.");
            }
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
        bookingRepository.save(newBooking);
        emailService.sendEmail(customer.getEmail(), reservations);
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
