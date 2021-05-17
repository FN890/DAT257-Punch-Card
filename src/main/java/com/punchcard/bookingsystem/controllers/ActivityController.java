package com.punchcard.bookingsystem.controllers;
import com.punchcard.bookingsystem.services.ActivityService;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
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
    public ResponseEntity<List<Activity>> getAllActivities(){
        return activityService.getAllActivities();
    }

    @GetMapping(path = "/active")
    public ResponseEntity<List<Activity>> getActive() {
        return activityService.getActive();
    }



    @GetMapping(path = "/name/{name}")
    public ResponseEntity getActivityByName(@PathVariable("name") String name) {
        return activityService.getActivityByName(name);
    }

    @PostMapping
    public ResponseEntity addNewActivity(@RequestBody Activity activity) {
        return activityService.addNewActivity(activity);
    }

    @DeleteMapping(path = "/name/{name}")
    public ResponseEntity deleteActivity(@PathVariable("name") String name) {
        return activityService.deleteActivity(name);
    }

    @PutMapping(path = "name/{name}")
    public void updateActivity(@PathVariable("name") String name, @RequestBody Activity activity) {
        activityService.updateActivity(name, activity);
    }

}

