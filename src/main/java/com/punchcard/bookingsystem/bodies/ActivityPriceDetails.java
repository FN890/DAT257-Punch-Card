package com.punchcard.bookingsystem.bodies;

public class ActivityPriceDetails {

    private final String name;
    private final int price;

    public ActivityPriceDetails(String name, int price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

}
