package com.punchcard.bookingsystem.bodies;

import java.util.Map;

public class PreBookingResponse {

    private final int price;
    private final Map<String, Integer> activities;

    public PreBookingResponse(int price, Map<String, Integer> activites) {
        this.price = price;
        this.activities = activites;
    }

    public int getPrice() {
        return price;
    }

    public Map<String, Integer> getActivities() {
        return activities;
    }

}
