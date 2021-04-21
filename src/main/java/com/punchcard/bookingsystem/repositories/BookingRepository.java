package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT * FROM Booking WHERE customer_phone = ?1", nativeQuery = true)
    List<Booking> findByCustomerPhone(String phone);

    @Query(value = "SELECT * FROM Booking WHERE id = ?1", nativeQuery = true)
    Optional<Booking> findById(int id);

    @Query(value = "SELECT * FROM Booking WHERE responsible = ?1", nativeQuery = true)
    List<Booking> findByResponsible(String responsible);

}
