package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

//  SELECT * FROM Customer WHERE name = ?
    Optional<Customer> findCustomerByName(String name);
}
