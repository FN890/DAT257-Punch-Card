package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT * FROM Booking WHERE archived ORDER BY start_time DESC", nativeQuery = true)
    List<Booking> findArchived();

    @Query(value = "SELECT * FROM Booking WHERE end_time >= CURRENT_TIMESTAMP ORDER BY start_time DESC", nativeQuery = true)
    List<Booking> findUpcoming();

    @Query(value = "SELECT * FROM Booking WHERE end_time < CURRENT_TIMESTAMP ORDER BY start_time DESC", nativeQuery = true)
    List<Booking> findPassed();

    List<Booking> findByCustomerPhoneNr(String phoneNr);

    Optional<Booking> findById(int id);

    List<Booking> findByResponsible(String responsible);

    List<Booking> findByCustomerEmail(String email);

    List<Booking> findByCustomerName(String name);

}
