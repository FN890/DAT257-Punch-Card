package com.punchcard.bookingsystem.tables;

import java.time.LocalDateTime;

public class BookingID {

    public final LocalDateTime startTime;
    public final LocalDateTime endTime;
    public final Activity activity;

    public BookingID(LocalDateTime startTime, LocalDateTime endTime, Activity activity) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activity = activity;
    }
}
