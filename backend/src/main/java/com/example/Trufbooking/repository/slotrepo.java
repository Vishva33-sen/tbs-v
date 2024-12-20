package com.example.Trufbooking.repository;

import com.example.Trufbooking.entity.admintable;
import com.example.Trufbooking.entity.slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface slotrepo extends JpaRepository<slot, Integer> {

    @Query(value = "SELECT " +
            "    turfid, " +
            "    jt.date, " +
            "    GROUP_CONCAT(DISTINCT slot.time ORDER BY slot.time) AS available_times " +
            "FROM " +
            "    slot_detail, " +
            "    JSON_TABLE(time, '$[*]' COLUMNS (" +
            "        date VARCHAR(10) PATH '$.date', " +
            "        slots JSON PATH '$.slots'" +
            "    )) AS jt, " +
            "    JSON_TABLE(jt.slots, '$[*]' COLUMNS (" +
            "        time VARCHAR(11) PATH '$.time', " +
            "        status VARCHAR(10) PATH '$.status'" +
            "    )) AS slot " +
            "WHERE " +
            "    turfid = :turfId " +
            "    AND slot.status = 'available' " +
            "GROUP BY " +
            "    turfid, jt.date", nativeQuery = true)
    List<Object[]> findAvailableSlotsByTurfId(Integer turfId);

}