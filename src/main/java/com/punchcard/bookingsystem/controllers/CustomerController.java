package com.punchcard.bookingsystem.controllers;

import com.punchcard.bookingsystem.services.CustomerService;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping(path = "{phoneNr}")
    public Optional<Customer> getCustomer(@PathVariable("phoneNr") String phoneNr) {
        return customerService.getCustomer(phoneNr);
    }

    @PostMapping
    public void addNewCustomer(@RequestBody Customer customer) {
        customerService.addNewCustomer(customer);
    }

    @DeleteMapping(path = "{phoneNr}")
    public void deleteCustomer(@PathVariable("phoneNr") String phoneNr) {
        customerService.deleteCustomer(phoneNr);
    }

}
