package com.example.demo.services;

import com.example.demo.dao.CourseRepository;
import com.example.demo.dao.TeacherRepository;
import com.example.demo.entities.Course;
import com.example.demo.entities.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CourseService {

    @Autowired
    private final CourseRepository courseRepository;

    @Autowired
    private final TeacherRepository teacherRepository;

    public CourseService(CourseRepository courseRepository, TeacherRepository teacherRepository) {
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
    }


    public List<Course> getCourses(){
        return courseRepository.findAll();
    }


    public Course addNewCourse(Course course) {
        return courseRepository.save(course);
    }

    public Long deleteCourse(Long courseId) {
        boolean b = courseRepository.existsById(courseId);
        if(!b){
            throw new IllegalStateException("Course with id "+courseId+" does not exists.");
        }
        courseRepository.deleteById(courseId);
        return courseId;
    }

    //Transactional bach mendir hata sql requete, update directelly by set method.
    @Transactional
    public void updateCourseBy(Long course_id, Course course) {
        Course db_course = courseRepository.findById(course_id).
            orElseThrow(()-> new IllegalStateException(
                            "Teacher with id: "+course_id+" does not exists"
                    )
            );
        Long teacher_id = course.getTeacher().getId();
        Teacher teacher = teacherRepository.getById(teacher_id);
        db_course.setDescription(course.getDescription());
        db_course.setDate(course.getDate());
        db_course.setTotalHours(course.getTotalHours());
        db_course.setTeacher(teacher);
       // return db_course;
    }

    public Course getCourseById(Long course_id) {
        boolean b = courseRepository.existsById(course_id);
        if(!b){
            throw new IllegalStateException("Course with id "+course_id+" does not exists.");
        }
        return courseRepository.findById(course_id).get();
    }

    public Long getTotalCourses(){
        return courseRepository.count();
    }

    public List<Object[]> getStats_1(
    ){
        return courseRepository.findStats1();
    }

    public List<Object[]> getStats_2() {
        return courseRepository.findStats2();
    }
}
