package com.example.Trufbooking.controller;

import com.example.Trufbooking.entity.Booking;
import com.example.Trufbooking.repository.Bookingrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private Bookingrepo bookingRepository;

    @PostMapping("/add")
    public String addBooking(@RequestBody Booking booking) {
        bookingRepository.save(booking); // Save the booking object directly
        return "Booking added successfully!";
    }
    @GetMapping("/{email}")
    public List<Booking> getBookingsByEmail(@PathVariable String email) {
        return bookingRepository.findByEmail(email);
    }

}
