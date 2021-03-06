package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.repositories.CustomerRepository;
import com.punchcard.bookingsystem.tables.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     * Handles the logic of fetching and returning the customer from the database
     * @return all customers in the database
     */
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    /**
     * Handles the logic of fetching a customer from the database with a specific id
     * @param id, the id of the customer to be fetched from the database
     * @return the customer with the specific id, if customer with id does not exists it throws an error
     */
    public Optional<Customer> getCustomerById(Long id) {
        if (customerRepository.findById(id).isPresent()) {
            return customerRepository.findById(id);
        }
        throw new IllegalStateException("Customer with id " + id + " does not exists.");
    }

    /**
     * Handles the logic of adding a new customer to the database
     * @param customer a customer body with name and phone number
     */
    public void addNewCustomer(Customer customer) {
        Optional<Customer> optionalCustomerPhone = customerRepository.findCustomerByPhoneNr(customer.getPhoneNr());
        Optional<Customer> optionalCustomerEmail = customerRepository.findCustomerByEmail(customer.getEmail());

        if(optionalCustomerPhone.isPresent()) {
            throw new IllegalStateException("Customer with phone number " + customer.getPhoneNr() + " already exists.");
        }

        if(optionalCustomerEmail.isPresent()) {
            throw new IllegalStateException("Customer with email " + customer.getEmail() + " already exists.");
        }
        customerRepository.save(customer);
    }

    /**
     * Handles the logic of deleting a customer from the database with a specific id
     * @param id the id of the customer to delete
     */
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new IllegalStateException("Customer with phone number: " + id + " does not exists.");
        }
        customerRepository.deleteById(id);
    }

    /**
     * Handles the logic of fetching a customer from the database with a specific name
     * @param name the name of the customer to be fetched from the database
     * @return the customer with the specified name
     */
    public Optional<Customer> getCustomerByName(String name) {
        Optional<Customer> optionalCustomer = customerRepository.findCustomerByName(name);

        if (optionalCustomer.isEmpty()) {
            throw new IllegalStateException("Customer with name " + name + " does not exists");
        }
        return customerRepository.findCustomerByName(name);
    }

    public Optional<Customer> getCustomerByPhone(String phoneNr) {
        Optional<Customer> optionalCustomer = customerRepository.findCustomerByPhoneNr(phoneNr);

        if (optionalCustomer.isEmpty()) {
            throw new IllegalStateException("Customer with phone number " + phoneNr + " does not exists");
        }
        return customerRepository.findCustomerByPhoneNr(phoneNr);
    }

    public Optional<Customer> getCustomerByEmail(String email) {
        Optional<Customer> optionalCustomer = customerRepository.findCustomerByEmail(email);

        if (optionalCustomer.isEmpty()) {
            throw new IllegalStateException("Customer with email " + email + " does not exists");
        }
        return customerRepository.findCustomerByEmail(email);
    }

    @Transactional
    public void updateCustomer (Long id, Customer newCustomer) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new IllegalStateException("Kund med " + id + " existerar inte"));

        if (newCustomer != null && newCustomer != customer) {
            customer.setPhoneNr(newCustomer.getPhoneNr());
            customer.setName(newCustomer.getName());
            customer.setEmail(newCustomer.getEmail());
        }

        customerRepository.save(customer);
    }
}
