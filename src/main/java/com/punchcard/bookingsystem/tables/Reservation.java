package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "activity_name")
    private Activity activity;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    public Reservation() {}

    public Reservation(LocalDateTime startTime, LocalDateTime endTime, Activity activity, Booking booking) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activity = activity;
        this.booking = booking;
    }

    public long getId() {
        return this.id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public Activity getActivity() {
        return activity;
    }

    public long getBooking() {
        return booking.getId();
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
