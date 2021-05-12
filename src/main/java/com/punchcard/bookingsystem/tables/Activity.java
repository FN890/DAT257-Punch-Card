package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Activity {

    @Id
    private String name ;

    @Column(nullable = false)
    private int price = 0;

    @Column(nullable = false)
    private int hourlyPrice = 0;

    @Column(nullable = false)
    private int dailyPrice = 0;

    @Column(nullable = false)
    private int pricePerPerson = 0;

    @Column(nullable = false)
    private Integer maxSize = 10;

    @Column(nullable = false)
    private boolean hourly = false;

    @Column(nullable = false)
    private boolean active = true;

    private String faq;

    @OneToMany(mappedBy = "activity", fetch = FetchType.LAZY)
    private List<Reservation> reservations;

    public Activity() {}

    public Activity(String name, Integer price, Integer maxSize, boolean hourly, String faq) {
        this.name = name;
        this.price = price;
        this.maxSize = maxSize;
        this.hourly = hourly;
        this.faq = faq;
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

    public int getHourlyPrice() {
        return hourlyPrice;
    }

    public void setHourlyPrice(int hourlyPrice) {
        this.hourlyPrice = hourlyPrice;
    }

    public int getDailyPrice() {
        return dailyPrice;
    }

    public void setDailyPrice(int dailyPrice) {
        this.dailyPrice = dailyPrice;
    }

    public int getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(int pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getFaq() {
        return faq;
    }

    public void setFaq(String faq) {
        this.faq = faq;
    }
}

