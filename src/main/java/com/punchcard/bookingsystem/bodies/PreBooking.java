package com.punchcard.bookingsystem.bodies;

import java.time.LocalDateTime;

public class PreBooking {

    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final Long activityId;

    public PreBooking(LocalDateTime startTime, LocalDateTime endTime, Long activityId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activityId = activityId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public Long getActivityId() {
        return activityId;
    }
}
