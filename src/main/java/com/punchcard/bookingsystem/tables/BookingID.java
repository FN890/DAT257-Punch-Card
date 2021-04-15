package com.punchcard.bookingsystem.tables;

import java.io.Serializable;
import java.time.LocalDateTime;

public class BookingID implements Serializable {

    public final LocalDateTime startTime;
    public final LocalDateTime endTime;

    public BookingID(LocalDateTime startTime, LocalDateTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
