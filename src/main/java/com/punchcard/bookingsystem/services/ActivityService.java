package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Customer;
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
        Optional<Activity> optionalActivity = activityRepository.findById(activity.getName());

        if(optionalActivity.isPresent()) {
            throw new IllegalStateException("Activity with name " + activity.getName() + " already exists");
        }
        activityRepository.save(activity);
    }
    //Method to delete a specific activity
    public void deleteActivity(String name){
        if(!activityRepository.existsById(name)){
            throw new IllegalStateException("Activity with name: " + name + "does not exist.");
        }
        activityRepository.deleteById(name);
    }


    //Method to return a specific activity (by name)
    public Optional <Activity> getActivityByName(String name) {
        Optional<Activity> optionalActivity = activityRepository.findById(name);

        if (optionalActivity.isEmpty()){
            throw new IllegalStateException("Activity with name " + name + "does not exist");
        }
        return activityRepository.findById(name);
    }


    //Hint: look at methods from Customer and Booking to get an idea of how to do it

    //Tips: före en commit/push, kör 'git status' för att se vilka filer ni ändrat så ni inte råkar pusha något fel :)
}
