package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Booking;
import com.punchcard.bookingsystem.tables.BookingID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, BookingID> {
}
