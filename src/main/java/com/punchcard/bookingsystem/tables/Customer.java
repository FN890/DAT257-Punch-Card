package com.punchcard.bookingsystem.tables;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Customer {

    @Id
    private String phoneNr;
    private String name;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings;

    public Customer() {
    }

    public Customer(String phoneNr, String name) {
        this.phoneNr = phoneNr;
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getPhoneNr() {
        return phoneNr;
    }

    public void setPhoneNr(String phoneNr) {
        this.phoneNr = phoneNr;
    }
}
