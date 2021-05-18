package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price = 0;

    @Column(nullable = false)
    private Integer hourlyPrice = 0;

    @Column(nullable = false)
    private Integer dailyPrice = 0;

    @Column(nullable = false)
    private Integer pricePerPerson = 0;

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

    public Long getId(){ return id; }

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

    public Integer getHourlyPrice() {
        return hourlyPrice;
    }

    public void setHourlyPrice(Integer hourlyPrice) {
        this.hourlyPrice = hourlyPrice;
    }

    public Integer getDailyPrice() {
        return dailyPrice;
    }

    public void setDailyPrice(Integer dailyPrice) {
        this.dailyPrice = dailyPrice;
    }

    public Integer getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(Integer pricePerPerson) {
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

