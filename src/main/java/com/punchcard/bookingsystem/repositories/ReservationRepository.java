package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "SELECT * FROM Reservation WHERE (:fromDate BETWEEN start_time AND end_time) OR (:toDate BETWEEN start_time AND end_time) OR (:fromDate <= start_time AND :toDate >= end_time)", nativeQuery = true)
    List<Reservation> findBetweenDates(@Param("fromDate") LocalDateTime fromDate, @Param("toDate") LocalDateTime toDate);

    @Query(value = "SELECT * FROM Reservation WHERE activity_name = :activityName AND ((:startTime BETWEEN start_time AND end_time) OR (:endTime BETWEEN start_time AND end_time) OR (:startTime <= start_time AND :endTime >= end_time))", nativeQuery = true)
    Optional<Reservation> findOccupied(@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime, @Param("activityName") String activityName);

}
