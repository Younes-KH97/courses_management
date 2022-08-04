package com.example.demo.dao;

import com.example.demo.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

        @Query(value = "select  t.lastname, t.firstname, count(*) as total from " +
                        "Teacher t join Course c on t.id=c.teacher.id group by t.id")
        List<Object[]> findStats1();

        @Query(value = "select YEAR(date), count(*), sum(totalHours) as total from Course c  group by YEAR(c.date) order by YEAR(c.date) asc")
        List<Object[]> findStats2();

}
