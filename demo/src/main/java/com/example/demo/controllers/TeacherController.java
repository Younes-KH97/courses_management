package com.example.demo.controllers;

import com.example.demo.entities.Teacher;
import com.example.demo.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping
    public ResponseEntity<List> getTeachers(){

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_RANGE);
        responseHeaders.add(HttpHeaders.CONTENT_RANGE, "bytes 0-20/500");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(teacherService.getTeachers());

    }

    @GetMapping(path = "{teacher_id}")
    public Teacher getTeacherById(
            @PathVariable("teacher_id") Long teacherId
    ){
        return teacherService.getTeacherById(teacherId);
    }

    @PostMapping
    public Teacher addNewTeacher(@RequestBody Teacher teacher){
        return teacherService.addNewTeacher(teacher);

    }

    @DeleteMapping(path = "{teacher_id}")
    public Long deleteTeacher(@PathVariable("teacher_id") Long id){
        try{
            return teacherService.deleteTeacher(id);
        }
        catch(Exception e){
            throw new ResponseStatusException(
                    HttpStatus.NOT_ACCEPTABLE, "Multiple courses are available for this teacher");
        }
    }

    @PutMapping(path = "{teacher_id}")
    public Teacher updateTeacher(
            @PathVariable("teacher_id") Long teacherId, @RequestBody Teacher teacher
    ){
        return teacherService.updateTeacherBy(teacherId, teacher);
    }

    @GetMapping(path = "total_teachers")
    public Long getStats_1(
    ){
        return teacherService.getTotalsCourses();
    }
}

