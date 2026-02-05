package com.anemos.project.repository;

import com.anemos.project.model.Weather;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface WeatherRepository {
    @Insert("""
            INSERT INTO weather(city, country, count, latitude, longitude)
            VALUES (#{city}, #{country}, 1, #{latitude}, #{longitude})
            """)
    void create(Weather weather);

    @Update("""
            UPDATE weather
            SET count = count + 1, latitude = #{latitude}, longitude = #{longitude}
            WHERE city = #{city} AND country = #{country}
            """)
    void updateCountByCityAndCountry(@Param("city") String city, @Param("country") String country,
                                    @Param("latitude") Double latitude, @Param("longitude") Double longitude);

    @Select("""
            SELECT id, city, country, count, latitude, longitude FROM weather
            WHERE city = #{city} AND country = #{country}
            """)
    Weather findByCityAndCountry(@Param("city") String city, @Param("country") String country);
            
    @Select("""
            SELECT EXISTS (
                SELECT 1 FROM (
                    SELECT city, country FROM weather
                    ORDER BY count DESC
                    LIMIT 3
                ) top3
                WHERE top3.city = #{city} AND top3.country = #{country}
            )
            """)
    Boolean isTop3Weather(@Param("city") String city, @Param("country") String country);
    @Select("""
            SELECT id, city, country, count, latitude, longitude FROM weather
            ORDER BY count DESC
            LIMIT 3
            """)
    List<Weather> findTop3Weather();

    @Select("""
            SELECT id, city, country, count, latitude, longitude FROM weather
            ORDER BY count DESC
            LIMIT 4
            """)
    List<Weather> findTop4Weather();
}
