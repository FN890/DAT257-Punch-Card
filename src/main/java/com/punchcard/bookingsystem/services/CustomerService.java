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

    public Optional<Customer> getCustomer(Long id) {
        if (customerRepository.findById(id).isPresent()) {
            return customerRepository.findById(id);
        }
        throw new IllegalStateException("Customer with id " + id + " does not exists.");
    }

    public void addNewCustomer(Customer customer) {
        Optional<Customer> optionalCustomer = customerRepository.findCustomerByPhoneNr(customer.getPhoneNr());

        if(optionalCustomer.isPresent()) {
            throw new IllegalStateException("Customer with phone number " + customer.getPhoneNr() + " already exists.");
        }
        customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new IllegalStateException("Customer with phone number: " + id + " does not exists.");
        }
        customerRepository.deleteById(id);
    }
}
