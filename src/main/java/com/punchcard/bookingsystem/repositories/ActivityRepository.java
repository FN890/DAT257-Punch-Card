package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActivityRepository  extends JpaRepository<Activity, Long> {

    //SELECT * FROM Activity WHERE name = ?
    Optional<Activity> findActivityByName(String name);
}
