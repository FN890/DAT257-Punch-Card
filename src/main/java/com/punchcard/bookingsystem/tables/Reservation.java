package com.punchcard.bookingsystem.tables;

import com.fasterxml.jackson.datatype.jsr310.ser.MonthDaySerializer;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Table
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "activity_name", nullable = false)
    private Activity activity;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
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

    public int getPrice() {
        int total = 0;
        total += activity.getPrice();

        long hours = ChronoUnit.HOURS.between(startTime, endTime);
        total += hours * activity.getHourlyPrice();

        long days = ChronoUnit.DAYS.between(startTime, endTime);
        total += days * activity.getDailyPrice();

        return total;
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
