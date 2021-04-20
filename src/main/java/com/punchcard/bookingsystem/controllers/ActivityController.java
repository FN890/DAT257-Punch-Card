package com.punchcard.bookingsystem.controllers;
import com.punchcard.bookingsystem.services.ActivityService;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    //Method to return a specific activity (by name)
    @GetMapping(path = "/name/{name}")
    public Optional<Activity> getActivityByName(@PathVariable("name") String name) {
        return activityService.getActivityByName(name);
    }

    //Skapade denna metod för att testa att id genererades automatiskt /Viktor
    @PostMapping
    public void addNewActivity(@RequestBody Activity activity) {
        activityService.addNewActivity(activity);
    }

    //Method to delete a specific activity (Hint: Will use id)
    @DeleteMapping(path = "/name/{name}")
    public void deleteActivity(@PathVariable("name") String name) {
        activityService.deleteActivity(name);
    }

    //Hint: look at methods from Customer and Booking to get an idea of how to do it
    //Hint: To find variables that are not primary keys, create method in repository
    //Hint: Name of method in repository is important for it to actually work!
}

