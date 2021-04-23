package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public void deleteActivity(String name){
        if(!activityRepository.existsById(name)){
            throw new IllegalStateException("Activity with name: " + name + " does not exists");
        }
        activityRepository.deleteById(name);
    }


    public Optional <Activity> getActivityByName(String name) {
        Optional<Activity> optionalActivity = activityRepository.findById(name);

        if (optionalActivity.isEmpty()){
            throw new IllegalStateException("Activity with name " + name + " does not exists");
        }
        return activityRepository.findById(name);
    }

    /**
     * Handles the logic of updating an activity
     * @param name the name of the activity that is to be updated
     * @param price the new price for the activity
     * @param maxSize the new max size for the activity
     */
    @Transactional
    public void updateActivity(String name, Integer price, Integer maxSize) {
        Activity activity = activityRepository.findById(name).orElseThrow(() -> new IllegalStateException(
                "Activity with name " + name + " does not exists"));

        if (price != null && !price.equals(activity.getPrice())) {
            activity.setPrice(price);
        }

        if (maxSize != null && !maxSize.equals(activity.getMaxSize())) {
            activity.setMaxSize(maxSize);
        }
    }

}
