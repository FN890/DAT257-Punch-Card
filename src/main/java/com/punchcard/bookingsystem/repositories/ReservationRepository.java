package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {


}
