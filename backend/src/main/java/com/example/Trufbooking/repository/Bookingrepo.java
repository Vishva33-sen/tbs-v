package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Bookingrepo extends JpaRepository<Booking, Integer> {
    List<Booking> findByEmail(String email);
}
