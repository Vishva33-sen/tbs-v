package com.example.Trufbooking.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import java.io.Serializable;
import java.util.List;

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "admintable")
public class admintable implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="turfid", nullable = false)
    private int turfid;

    @Column(name="turfname",nullable = false)
    private String turfname;

    @Column(name="location",nullable = false)
    private String location;

    @Column(name="mobilenumber", nullable = false)
    private long mobilenumber;

    @Column(name="price", nullable = false)
    private double price;

    @Column(name = "sports", columnDefinition = "JSON", nullable = false)
    @Convert(converter = SportsConverter.class)
    private List<String> sports;

}
