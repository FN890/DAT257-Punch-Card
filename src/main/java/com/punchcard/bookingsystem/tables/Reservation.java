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

    private int groupSize;

    @ManyToOne
    @JoinColumn(name = "activity_name")
    private Activity activity;

    public Reservation() {}

    public Reservation(LocalDateTime startTime, LocalDateTime endTime, Activity activity, int groupSize) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.activity = activity;
        this.groupSize = groupSize;
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

    public int getGroupSize() {
        return groupSize;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setGroupSize(int groupSize) {
        this.groupSize = groupSize;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

}
