package com.punchcard.bookingsystem.tables;

import java.time.LocalDateTime;

public class BookingID {

    public final LocalDateTime startTime;
    public final LocalDateTime endTime;

    public BookingID(LocalDateTime startTime, LocalDateTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
