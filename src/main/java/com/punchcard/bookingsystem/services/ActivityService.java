package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.ActivityRepository;
import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<List<Activity>> getAllActivities(){
        return ResponseEntity.ok(activityRepository.findAll());
    }

    public ResponseEntity<List<Activity>> getActive() {
        return ResponseEntity.ok(activityRepository.findActive());
    }

    public ResponseEntity addNewActivity(Activity activity) {
        Optional<Activity> optionalActivity = activityRepository.findById(activity.getName());

        if(optionalActivity.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aktivitet med namn " + activity.getName() + " finns redan.");
        }
        activityRepository.save(activity);
        return ResponseEntity.ok("Aktivitet tillagd.");
    }

    public ResponseEntity deleteActivity(String name){
        Optional<Activity> oa = activityRepository.findById(name);
        if(oa.isEmpty()){
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aktivitet med namn " + name + " hittades inte.");
        }
        oa.get().setActive(false);
        return ResponseEntity.ok("Aktivitet borttagen.");
    }


    public ResponseEntity getActivityByName(String name) {
        Optional<Activity> optionalActivity = activityRepository.findById(name);

        if (optionalActivity.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aktivitet med namn " + name + " hittades inte");
        }
        return ResponseEntity.ok(optionalActivity.get());
    }

    /**
     * Handles the logic of updating an activity
     * @param name the name of the activity that is to be updated
     * @param price the new price for the activity
     * @param maxSize the new max size for the activity
     */
    @Transactional
    public void updateActivity(String name, Integer price, Integer hourlyPrice, Integer dailyPrice, Integer pricePerPerson, Integer maxSize, String faq) {
        Activity activity = activityRepository.findById(name).orElseThrow(() -> new IllegalStateException(
                "Activity with name " + name + " does not exists"));

        if (price != null && !price.equals(activity.getPrice())) {
            activity.setPrice(price);
        }
        if (hourlyPrice != null && !hourlyPrice.equals(activity.getHourlyPrice())) {
            activity.setPrice(price);
        }
        if (dailyPrice != null && !dailyPrice.equals(activity.getDailyPrice())) {
            activity.setPrice(price);
        }
        if (pricePerPerson != null && !pricePerPerson.equals(activity.getPricePerPerson())) {
            activity.setPrice(price);
        }

        if (maxSize != null && !maxSize.equals(activity.getMaxSize())) {
            activity.setMaxSize(maxSize);
        }

        if (faq != null && !faq.equals(activity.getFaq())) {
            activity.setFaq(faq);
        }

        activityRepository.save(activity);
    }

}
