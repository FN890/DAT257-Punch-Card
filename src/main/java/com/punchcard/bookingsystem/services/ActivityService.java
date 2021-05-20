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
    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(activityRepository.findAll());
    }

    public ResponseEntity<List<Activity>> getActive() {
        return ResponseEntity.ok(activityRepository.findActive());
    }

    public ResponseEntity addNewActivity(Activity activity) {
        // No need for this check since I added Long id to activity, but commented just in case
        /*
        Optional<Activity> optionalActivity = activityRepository.findById(activity.getId());

        if (optionalActivity.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Aktivitet med namn " + activity.getName() + " finns redan.");
        }

         */
        activityRepository.save(activity);
        return ResponseEntity.ok("Aktivitet tillagd.");
    }

    public ResponseEntity deleteActivity(Long id) {
        Optional<Activity> oa = activityRepository.findById(id);
        if (oa.isEmpty()) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aktivitet med id " + id + " hittades inte.");
        }
        oa.get().setActive(false);
        activityRepository.save(oa.get());
        return ResponseEntity.ok("Aktivitet borttagen.");
    }

    public Activity getActivityById(Long id) {
        Optional<Activity> optionalActivity = activityRepository.findById(id);

        if (optionalActivity.isEmpty()) {
            throw new IllegalStateException("Aktivitet med id " + id + " hittades inte");
        }
        return optionalActivity.get();
    }

    @Transactional
    public void updateActivity(String name, Activity updatedActivity) {
        Activity oldActivity = activityRepository.findById(name).orElseThrow(() -> new IllegalStateException(
                "Activity with name " + name + " does not exists"));

        if (updatedActivity.getPrice() != null && !updatedActivity.getPrice().equals(oldActivity.getPrice())) {
            oldActivity.setPrice(updatedActivity.getPrice());
        }
        if (updatedActivity.getHourlyPrice() != null && !updatedActivity.getHourlyPrice().equals(oldActivity.getHourlyPrice())) {
            oldActivity.setPrice(updatedActivity.getPrice());
        }
        if (updatedActivity.getDailyPrice() != null && !updatedActivity.getDailyPrice().equals(oldActivity.getDailyPrice())) {
            oldActivity.setPrice(updatedActivity.getPrice());
        }
        if (updatedActivity.getPricePerPerson() != null && !updatedActivity.getPricePerPerson().equals(oldActivity.getPricePerPerson())) {
            oldActivity.setPrice(updatedActivity.getPrice());
        }

        if (updatedActivity.getMaxSize() != null && !updatedActivity.getMaxSize().equals(oldActivity.getMaxSize())) {
            oldActivity.setMaxSize(updatedActivity.getMaxSize());
        }

        if (updatedActivity.getFaq() != null && !updatedActivity.getFaq().equals(oldActivity.getFaq())) {
            oldActivity.setFaq(updatedActivity.getFaq());
        }

        activityRepository.save(oldActivity);
    }

}
