package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int groupSize;

    @ManyToOne
    @JoinColumn(name = "customer_phone")
    private Customer customer;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Reservation> reservations;

    public Booking() {}

    public Booking(Customer customer, int groupSize) {
        this.customer = customer;
        this.groupSize = groupSize;
    }

    public long getId() {
        return this.id;
    }

    public int getGroupSize() {
        return this.groupSize;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setGroupSize(int size) {
        this.groupSize = size;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
