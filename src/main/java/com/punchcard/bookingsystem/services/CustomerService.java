package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.CustomerRepository;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomer(String phoneNr) {
        if (customerRepository.findById(phoneNr).isPresent()) {
            return customerRepository.findById(phoneNr);
        }
        throw new IllegalStateException("Customer with phone number " + phoneNr + " does not exist.");
    }
}