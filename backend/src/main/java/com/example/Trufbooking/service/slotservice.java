package com.example.Trufbooking.service;

import com.example.Trufbooking.entity.slotdto;
import com.example.Trufbooking.repository.slotrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class slotservice {
    @Autowired
    slotrepo slotrepo;


    public List<slotdto> getAvailableSlots(Integer turfId) {
        List<Object[]> queryResults = slotrepo.findAvailableSlotsByTurfId(turfId);
        List<slotdto> availableSlots = new ArrayList<>();

        // Iterate over query results and populate the SlotDTO objects
        for (Object[] result : queryResults) {
            Integer turfid = (Integer) result[0];
            String date = (String) result[1];
            String availableTimes = (String) result[2];

            // Split the availableTimes string into a list of strings (assuming times are comma-separated)
            List<String> timesList = List.of(availableTimes.split(","));

            // Create a SlotDTO object and add to the list
            availableSlots.add(new slotdto(date, timesList));
        }

        return availableSlots;
    }
}