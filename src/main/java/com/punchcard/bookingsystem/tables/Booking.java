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

    @Column(nullable = false)
    private boolean paid = false;

    private Integer price = null;

    @Column(nullable = false)
    private boolean archived = false;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

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

    public boolean isPaid() {
        return paid;
    }

    public int getPrice() {
        if (price == null) {
            int total = 0;
            for (Reservation r : reservations) {
                total += r.getPrice();
            }
            return total;
        }

        return price;
    }

    public boolean isArchived() {
        return archived;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public LocalDateTime getStartTime() {
        LocalDateTime earliest = null;
        for (Reservation r : reservations) {
            if (earliest == null || earliest.isAfter(r.getStartTime())) {
                earliest = r.getStartTime();
            }
        }

        System.out.println("Setting starttime: " + startTime);
        this.startTime = earliest;

        return startTime;
    }

    public LocalDateTime getEndTime() {
        LocalDateTime latest = null;
        for (Reservation r : reservations) {
            if (latest == null || latest.isBefore(r.getEndTime())) {
                latest = r.getEndTime();
            }
        }

        this.endTime = latest;
        return endTime;
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

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
