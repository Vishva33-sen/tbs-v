package com.example.Trufbooking.service;

import com.example.Trufbooking.entity.slot;
import com.example.Trufbooking.entity.slotdto;
import com.example.Trufbooking.repository.slotrepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
public class slotservice {
    @Autowired
    slotrepo slotrepo;

    @PostConstruct
    public void init() {
        updateDatesWithCurrentDate();
    }
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
    @Transactional
    public void updateDatesWithCurrentDate() {
        // Get today's, tomorrow's, and day after tomorrow's dates
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        // Get current date, tomorrow's date, and the day after tomorrow's date
        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);

        String currentDate = sdf.format(today);

        cal.add(Calendar.DATE, 1);
        String tomorrowDate = sdf.format(cal.getTime());

        cal.add(Calendar.DATE, 1);
        String dayAfterTomorrow = sdf.format(cal.getTime());

        // Update the JSON column with the new dates
        updateSlotDates(currentDate, tomorrowDate, dayAfterTomorrow);
    }

    private void updateSlotDates(String today, String tomorrow, String dayAfterTomorrow) {
        String updateQuery =
                "UPDATE slot_detail " +
                        "SET time = JSON_SET(time, " +
                        "    '$[0].date', ? , " + // Update the first date
                        "    '$[1].date', ? , " + // Update the second date
                        "    '$[2].date', ? ) " + // Update the third date
                        "WHERE JSON_CONTAINS(time, JSON_OBJECT('date', ?), '$')";

        // Execute update query with the new dates
        slotrepo.executeCustomUpdate(today, tomorrow, dayAfterTomorrow);
    }
    @Scheduled(cron = "0 0 0 * * ?")  // This will run at midnight every day
    public void updateTodaysDateAutomatically() {
        updateDatesWithCurrentDate();
    }
}