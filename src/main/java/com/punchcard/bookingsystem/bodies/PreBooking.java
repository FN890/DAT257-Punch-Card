package com.punchcard.bookingsystem.bodies;

import java.time.LocalDateTime;

public class PreBooking {

    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final String activityName;

    public PreBooking(LocalDateTime startTime, LocalDateTime endTime, String activityName) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activityName = activityName;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public String getActivityName() {
        return activityName;
    }
}
