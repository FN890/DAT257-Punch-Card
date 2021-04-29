package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Activity {

    @Id
    private String name ;

    @Column(nullable = false)
    private Integer price = 0;

    @Column(nullable = false)
    private Integer maxSize = 10;

    @Column(nullable = false)
    private boolean hourly = false;

    @OneToMany(mappedBy = "activity", fetch = FetchType.LAZY)
    private List<Reservation> reservations;

    public Activity() {}

    public Activity(String name, Integer price, Integer maxSize, boolean hourly) {
        this.name = name;
        this.price = price;
        this.maxSize = maxSize;
        this.hourly = hourly;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getMaxSize() {
        return maxSize ;
    }

    public void setMaxSize(Integer maxSize) {
        this.maxSize = maxSize ;
    }

    public boolean isHourly() {
        return hourly;
    }

    public void setHourly(boolean hourly) {
        this.hourly = hourly;
    }

}

