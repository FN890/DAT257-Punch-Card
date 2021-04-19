package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.tables.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public void addNewActivity(Activity activity) {
        Optional<Activity> optionalActivity = activityRepository.findActivityByName(activity.getName());

        if(optionalActivity.isPresent()) {
            throw new IllegalStateException("Activity with name " + activity.getName() + " already exists");
        }
        activityRepository.save(activity);
    }

    //Method to return a specific activity (by id)
    //Method to return a specific activity (by name)
    //Method to delete a specific activity
    //Hint: look at methods from Customer and Booking to get an idea of how to do it

    //Tips: före en commit/push, kör 'git status' för att se vilka filer ni ändrat så ni inte råkar pusha något fel :)
}
