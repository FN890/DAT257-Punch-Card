package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.tables.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository ;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository ;
    }

    public List<Activity> getAllActivities(){
        return activityRepository.findAll() ;
    }
    // Return a specific activity

    // More methods... ?
}
