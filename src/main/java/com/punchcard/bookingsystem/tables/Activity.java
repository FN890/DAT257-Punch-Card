package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Activity {

    @Id
    private String name ;
    private Integer price ;
    private Integer maxSize ;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    public Activity() {
    }

    public Activity(String name, Integer price, Integer maxSize) {
        this.name = name ;
        this.price = price ;
        this.maxSize = maxSize ;
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
    public void setMaxSize() {
        this.maxSize = maxSize ;
    }
}

