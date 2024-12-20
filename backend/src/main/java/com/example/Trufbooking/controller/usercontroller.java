package com.example.Trufbooking.controller;

import com.example.Trufbooking.entity.UserInfo;
import com.example.Trufbooking.entity.admintable;
import com.example.Trufbooking.entity.userdto;
import com.example.Trufbooking.entity.usertable;
import com.example.Trufbooking.repository.Userinforepo;
import com.example.Trufbooking.service.userservice;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/home")
public class usercontroller {
    @Autowired
    userservice userser;
    @Autowired
    Userinforepo userInfoRepository;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody usertable user) {
        try {
            usertable result = userser.registerUser(user);

            String email = result.getEmail();
            System.out.println("Email from result: " + email);

            if (email == null || email.isEmpty()) {
                return ResponseEntity.status(400).body("Email is missing or invalid.");
            }

            UserInfo userInfo = new UserInfo();
            userInfo.setEmail(email);

            userInfoRepository.save(userInfo);

            return ResponseEntity.status(201).body(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestMap) {
        String email = requestMap.get("email");
        String password = requestMap.get("password");
        Optional<usertable> user = userser.authenticateUser(email, password);
        if (user.isPresent()) {
            return ResponseEntity.ok("Login Successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    public ResponseEntity<String> login(@RequestBody usertable loginRequest, HttpSession session){
        try{
            boolean isAuthenticated = userser.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            if(isAuthenticated){
                session.setAttribute("user", loginRequest.getEmail());
                return ResponseEntity.ok("Login Successful");
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
    @PostMapping("/toggle")
    public ResponseEntity<String> toggleWishlist(
            @RequestParam String email,
            @RequestParam Integer turfId
    ) {
        String result = userser.toggleWishlist(email, turfId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/wishlist")
    public List<Integer> getWishlist(@RequestParam String email) {
        return userser.getWishlistByEmail(email);
    }
    @GetMapping("/user/{email}")
    public userdto getUserDetails(@PathVariable String email) {
        userdto userDetails = userser.getUserDetailsByEmail(email);
        System.out.println("Fetched User Details: " + userDetails);
        return userDetails;
    }
    @GetMapping("/wishlist/{email}")
    public ResponseEntity<List<admintable>> getWishlistbyturfid(@PathVariable String email) {
        List<admintable> wishlistDetails = userser.getWishlistDetailsByEmail(email);
        return ResponseEntity.ok(wishlistDetails);
    }

}

