package com.example.demo.controllers;

import com.example.demo.entities.Course;
import com.example.demo.entities.Teacher;
import com.example.demo.services.CourseService;
import com.example.demo.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/course")
public class CourseController {
    private final CourseService courseService;
    private final TeacherService teacherService;

    @Autowired
    public CourseController(CourseService courseService, TeacherService teacherService) {
        this.courseService = courseService;
        this.teacherService = teacherService;
    }

    @GetMapping
    public ResponseEntity<List> getTeachers(){

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_RANGE);
        responseHeaders.add(HttpHeaders.CONTENT_RANGE, "bytes 0-20/500");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(courseService.getCourses());

    }

    @GetMapping(path = "{course_id}")
    public Course getCourseById(
            @PathVariable("course_id") Long course_id
    ){
        return courseService.getCourseById(course_id);
    }

    @PostMapping
    public Course addNewCourse(@RequestBody Course course)
    {
        Teacher teacher = teacherService.getTeacherById(course.getTeacher().getId());
        Course new_course = Course.builder().
                                description(course.getDescription()).
                                date(course.getDate()).
                                totalHours(course.getTotalHours()).
                                teacher(teacher).build();
        return courseService.addNewCourse(new_course);
    }

    @DeleteMapping(path = "{course_id}")
    public Long deleteCourse(@PathVariable("course_id") Long id){
        return courseService.deleteCourse(id);
    }

    @PutMapping(path = "{course_id}")
    public void updateCourse(
            @PathVariable("course_id") Long course_id,
            @RequestBody Course course
    ){
        courseService.updateCourseBy(course_id, course);
    }

    @GetMapping(path = "total_courses")
    public Long getTotalCourses(
    ){
        return courseService.getTotalCourses();
    }

    @GetMapping(path = "stats1")
    public List<Object[]> getStats_1(
    ){
        return courseService.getStats_1();
    }

    @GetMapping(path = "stats2")
    public List<Object[]> getStats_2(
    ){
        return courseService.getStats_2();
    }
}



