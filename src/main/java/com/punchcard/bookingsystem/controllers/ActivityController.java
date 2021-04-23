package com.punchcard.bookingsystem.controllers;
import com.punchcard.bookingsystem.services.ActivityService;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Activity> getAllActivities(){
        return activityService.getAllActivities();

    }

    @GetMapping(path = "/name/{name}")
    public Optional<Activity> getActivityByName(@PathVariable("name") String name) {
        return activityService.getActivityByName(name);
    }

    @PostMapping
    public void addNewActivity(@RequestBody Activity activity) {
        activityService.addNewActivity(activity);
    }

    @DeleteMapping(path = "/name/{name}")
    public void deleteActivity(@PathVariable("name") String name) {
        activityService.deleteActivity(name);
    }

    @PutMapping(path = "name/{name}")
    public void updateActivity(@PathVariable("name") String name,
                               @RequestParam(required = false) Integer price,
                               @RequestParam(required = false)Integer maxSize) {
        activityService.updateActivity(name, price, maxSize);
    }

}

