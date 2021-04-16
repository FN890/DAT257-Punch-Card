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

    @PostMapping
    public void addNewActivity(@RequestBody Activity activity) {
        activityService.addNewActivity(activity);
    }
}


