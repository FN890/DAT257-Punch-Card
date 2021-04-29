package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.services.CustomerService;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.management.OperatingSystemMXBean;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "api/v1/customer")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    /**
     * Returns all customers in the database
     * @return all customers in the database in JSON format
     */
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    /**
     * Returns a customer with a specific id
     * @param id, the id number of a customer
     * @return the customer with the specific id
     */
    @GetMapping(path = "/id/{id}")
    public Optional<Customer> getCustomerById(@PathVariable("id") Long id) {
        return customerService.getCustomerById(id);
    }

    /**
     * Returns a customer with a specific name
     * @param name, the name of a customer
     * @return the customer with the specific name
     */
    @GetMapping(path = "/name/{name}")
    public Optional<Customer> getCustomerByName(@PathVariable("name") String name) {
        return customerService.getCustomerByName(name);
    }

    @GetMapping(path = "/phone/{phoneNr}")
    public Optional<Customer> getCustomerByPhone(@PathVariable("phoneNr") String phoneNr) {
        return customerService.getCustomerByPhone(phoneNr);
    }

    /**
     * Handles inserting a customer in the database
     * @param customer the customer to be added to the database,
     *                 needs name and phone number
     */
    @PostMapping
    public void addNewCustomer(@RequestBody Customer customer) {
        customerService.addNewCustomer(customer);
    }

    /**
     * Deletes a customer by id
     * @param id, the id of the customer to delete
     */
    @DeleteMapping(path = "/id/{id}")
    public void deleteCustomer(@PathVariable("id") Long id) {
        customerService.deleteCustomer(id);
    }

}
