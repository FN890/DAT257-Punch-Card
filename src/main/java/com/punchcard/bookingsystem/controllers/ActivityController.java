package com.punchcard.bookingsystem.controllers;
import com.punchcard.bookingsystem.services.ActivityService;
import com.punchcard.bookingsystem.tables.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/activity")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public List<Activity> getAllActivities(){
        return activityService.getAllActivities();

    }

    //Skapade denna metod för att testa att id genererades automatiskt /Viktor
    @PostMapping
    public void addNewActivity(@RequestBody Activity activity) {
        activityService.addNewActivity(activity);
    }

    //Method to return a specific activity (by id)
    //Method to return a specific activity (by name)
    //Method to delete a specific activity (Hint: Will use id)
    //Hint: look at methods from Customer and Booking to get an idea of how to do it
    //Hint: To find variables that are not primary keys, create method in repository
    //Hint: Name of method in repository is important for it to actually work!
}


