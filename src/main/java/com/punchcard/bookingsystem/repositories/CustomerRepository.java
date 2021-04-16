package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

//  SELECT * FROM Customer WHERE phoneNr = ?
    Optional<Customer> findCustomerByPhoneNr(String phoneNr);
}
