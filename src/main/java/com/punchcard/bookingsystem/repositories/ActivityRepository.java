package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepository  extends JpaRepository<Activity, String> {

    @Query(value = "SELECT * FROM Activity WHERE active", nativeQuery = true)
    List<Activity> findActive();

    Optional<Activity> findById(Long id);
}
