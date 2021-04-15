package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
}
