package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "activityName")
    private Activity activity;

    private int groupSize;

    @ManyToOne
    @JoinColumn(name = "customerPhone")
    private Customer customer;

    public Booking(LocalDateTime startTime, LocalDateTime endTime, Activity activity, Customer customer) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activity = activity;
        this.customer = customer;
    }

    public long getId() {
        return this.id;
    }

    public LocalDateTime getStartTime() {
        return this.startTime;
    }

    public LocalDateTime getEndTime() {
        return this.endTime;
    }

    public int getGroupSize() {
        return this.groupSize;
    }

    public Activity getActivity() {
        return this.activity;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setStartTime(LocalDateTime time) {
        this.startTime = time;
    }

    public void setEndTime(LocalDateTime time) {
        this.endTime = time;
    }

    public void setGroupSize(int size) {
        this.groupSize = size;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

}
