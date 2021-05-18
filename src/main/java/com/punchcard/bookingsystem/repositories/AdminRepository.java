package com.punchcard.bookingsystem.repositories;

import com.punchcard.bookingsystem.tables.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query(value = "SELECT * FROM Admin WHERE name=:name", nativeQuery = true)
    Optional<Admin> findByName(@Param("name") String name);
}
