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

    @Query(value = "SELECT * FROM Booking WHERE customerPhone = ?1", nativeQuery = true)
    List<Booking> findByCustomerPhone(int phone);

    @Query(value = "SELECT * FROM Booking WHERE id = ?1", nativeQuery = true)
    Optional<Booking> findById(int id);

    @Query(value = "SELECT * FROM Booking WHERE (:fromDate BETWEEN startTime AND endTime) OR (:toDate BETWEEN startTime AND endTime)", nativeQuery = true)
    List<Booking> findBetweenDates(@Param("fromDate") LocalDateTime fromDate, @Param("toDate") LocalDateTime toDate);

}
