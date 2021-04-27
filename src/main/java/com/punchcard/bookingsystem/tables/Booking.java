package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer groupSize = 0;
    private String description;

    @Column(nullable = false)
    private String responsible;

    @ManyToOne
    @JoinColumn(name = "customer_phone", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Reservation> reservations;

    public Booking() {}

    public Booking(Customer customer, Integer groupSize) {
        this.customer = customer;
        this.groupSize = groupSize;
    }

    public Long getId() {
        return this.id;
    }

    public Integer getGroupSize() {
        return this.groupSize;
    }

    public String getDescription() {
        return description;
    }

    public String getResponsible() {
        return responsible;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    @Column(name = "start_time")
    public LocalDateTime getStartTime() {
        LocalDateTime earliest = null;
        for (Reservation r : reservations) {
            if (earliest == null || earliest.isAfter(r.getStartTime())) {
                earliest = r.getStartTime();
            }
        }

        return earliest;
    }

    @Column(name = "end_time")
    public LocalDateTime getEndTime() {
        LocalDateTime latest = null;
        for (Reservation r : reservations) {
            if (latest == null || latest.isBefore(r.getEndTime())) {
                latest = r.getEndTime();
            }
        }

        return latest;
    }

    public void setGroupSize(int size) {
        this.groupSize = size;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
