package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.ReservationRepository;
import com.punchcard.bookingsystem.tables.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getByDate(LocalDate startDate, LocalDate endDate) {
        return reservationRepository.findBetweenDates(startDate.atStartOfDay(), endDate.atStartOfDay());
    }

}
