package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class Booking {

    @Id
    private LocalDateTime startTime;

    @Id
    private LocalDateTime endTime;

    @Id
    //private Activity activity;

    private int groupSize;


    public LocalDateTime getStartTime() {
        return this.startTime;
    }

    public LocalDateTime getEndTime() {
        return this.endTime;
    }

    public int getGroupSize() {
        return this.groupSize;
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
}
