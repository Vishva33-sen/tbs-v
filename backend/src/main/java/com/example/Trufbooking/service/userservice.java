package com.example.Trufbooking.service;

import com.example.Trufbooking.entity.UserInfo;
import com.example.Trufbooking.entity.admintable;
import com.example.Trufbooking.entity.userdto;
import com.example.Trufbooking.entity.usertable;
import com.example.Trufbooking.repository.Userinforepo;
import com.example.Trufbooking.repository.turfrepo;
import com.example.Trufbooking.repository.userrepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class userservice {

    @Autowired
    private userrepository userrepo;
    @Autowired
    private Userinforepo userInfoRepository;
    @Autowired
    private turfrepo turfRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public userservice(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public usertable registerUser(usertable user) {

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        log.info(String.valueOf(user.getMobile_number()));
        log.info(String.valueOf(user.getUsername()));


        return userrepo.save(user);
    }


    public Optional<usertable> authenticateUser(String email, String password) {
        Optional<usertable> user = userrepo.findByEmail(email);
        if (user.isPresent() && bCryptPasswordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }

        return Optional.empty();
    }

    public boolean authenticate(String email, String password) {
        usertable user = userrepo.findByUsername(email);
        if(!user.getEmail().equals(email)) {
            throw new UsernameNotFoundException("Invalid email");
        }
        if(!user.getPassword().equals(bCryptPasswordEncoder.encode(password))) {
            throw new BadCredentialsException("Invalid password");
        }
        return true;
    }

    public Optional<usertable> findUserByEmail(String email) {

        return userrepo.findByEmail(email); // Replace with the actual implementation
    }

    public String toggleWishlist(String email, Integer turfId) {

        UserInfo user = userInfoRepository.findByEmail(email);


        if (user == null) {
            return "User not found.";
        }

        List<Integer> wishlist = user.getWishlist();
        if (wishlist == null) {
            wishlist = new java.util.ArrayList<>();
        }

        if (wishlist.contains(turfId)) {
            wishlist.remove(turfId);
        } else {
            wishlist.add(turfId);
        }

        user.setWishlist(wishlist);
        userInfoRepository.save(user);

        return "Wishlist updated successfully.";
    }
    public List<Integer> getWishlistByEmail(String email) {
        UserInfo user = userInfoRepository.findByEmail(email);
        return user.getWishlist();
    }
    public userdto getUserDetailsByEmail(String email) {
        return userrepo.findUserDetailsByEmail(email);
    }
    public List<admintable> getWishlistDetailsByEmail(String email) {
        UserInfo user = userInfoRepository.findByEmail(email);

        if (user == null || user.getWishlist() == null) {
            return new ArrayList<>();
        }

        List<admintable> turfs = new ArrayList<>();

        // Fetch turf details one by one based on wishlist (which contains turfid)
        for (Integer turfid : user.getWishlist()) {
            Optional<admintable> turf = turfRepository.findById(turfid);
            turf.ifPresent(turfs::add);  // Add to the list if the turf exists
        }
        return turfs;

    }


}

