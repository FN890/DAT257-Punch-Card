package com.punchcard.bookingsystem.bodies;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PreBookingResponse {

    private final int price;
    private final List<ActivityPriceDetails> activities;

    public PreBookingResponse(int price, Map<String, Integer> activites) {
        this.price = price;
        this.activities = new ArrayList<>();
        for (String a : activites.keySet()) {
            this.activities.add(new ActivityPriceDetails(a, activites.get(a)));
        }
    }

    public int getPrice() {
        return price;
    }

    public List<ActivityPriceDetails> getActivities() {
        return activities;
    }

}
