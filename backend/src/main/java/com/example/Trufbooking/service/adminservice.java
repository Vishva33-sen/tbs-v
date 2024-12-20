package com.example.Trufbooking.service;

import com.example.Trufbooking.entity.admintable;
import com.example.Trufbooking.entity.turfDto;
import com.example.Trufbooking.repository.admintable_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class adminservice {

    @Autowired
    admintable_repo adminrepo;

    public List<String> getDistinctLocations() {
        return adminrepo.findDistinctLocations();
    }

    public List<String> getDistinctSports() {
        return adminrepo.findDistinctSports();
    }

    public List<admintable> findTurfsByLocationAndSport(String location, String sport) {
        return adminrepo.findByLocationAndSport(location, sport);
    }

    public admintable findTurfById(Integer turfId) {
        return adminrepo.findById(turfId).orElse(null); // Or throw a custom exception if not found
    }


}
