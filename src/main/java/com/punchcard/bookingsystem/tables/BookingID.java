package com.punchcard.bookingsystem.tables;

import java.io.Serializable;
import java.time.LocalDateTime;

public class BookingID implements Serializable {

    public final LocalDateTime startTime;
    public final LocalDateTime endTime;
    public final Activity activity;

    public BookingID(LocalDateTime startTime, LocalDateTime endTime, Activity activity) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activity = activity;
    }
}
