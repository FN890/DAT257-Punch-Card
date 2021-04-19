package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT * FROM Booking WHERE customer_phone = ?1", nativeQuery = true)
    List<Booking> findByCustomerPhone(int phone);

    @Query(value = "SELECT * FROM Booking WHERE id = ?1", nativeQuery = true)
    Optional<Booking> findById(int id);

    //TODO: Move and update Query
    @Query(value = "SELECT * FROM Booking WHERE (:fromDate BETWEEN start_time AND end_time) OR (:toDate BETWEEN start_time AND end_time) OR (:fromDate <= start_time AND :toDate >= end_time)", nativeQuery = true)
    List<Booking> findBetweenDates(@Param("fromDate") LocalDateTime fromDate, @Param("toDate") LocalDateTime toDate);

}
