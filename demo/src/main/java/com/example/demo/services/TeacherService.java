package com.example.demo.services;

import com.example.demo.dao.TeacherRepository;
import com.example.demo.entities.Teacher;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public List<Teacher> getTeachers(){
        return teacherRepository.findAll();
    }


    public Teacher addNewTeacher(Teacher teacher) {
//        Optional<Teacher> teacherOptional = teacherRepository.findByFirstname(teacher.getFirstname());
//        if(teacherOptional.isPresent()){
//            throw new IllegalStateException("Teacher already exists.");
//        }

        return teacherRepository.save(teacher);
    }

    public Long deleteTeacher(Long teacherId) {
        boolean b = teacherRepository.existsById(teacherId);
        if(!b){
            throw new IllegalStateException("Teacher with id "+teacherId+" does not exists.");
        }
        try{
            teacherRepository.deleteById(teacherId);
        }
        catch (Exception ex){
            throw new IllegalStateException("This teacher has multiple courses!");
        }
        return teacherId;
    }

    public Teacher getTeacherById(Long teacher_id){
        boolean b = teacherRepository.existsById(teacher_id);
        if(!b){
            throw new IllegalStateException("Teacher with id "+teacher_id+" does not exists.");
        }
        return teacherRepository.findById(teacher_id).get();
    }

    //Transactional bach mendir hata sql requete, update directelly by set method.
    @Transactional
    public Teacher updateTeacherBy(Long teacherId, Teacher new_teacher) {
        Teacher teacher = teacherRepository.findById(teacherId).
                orElseThrow(()-> new IllegalStateException(
                                "Teacher with id: "+teacherId+" does not exists"
                        )
                );
        teacher.setFirstname(new_teacher.getFirstname());
        teacher.setLastname(new_teacher.getLastname());
        teacher.setEmail(new_teacher.getEmail());
        return teacher;
    }

    public Long getTotalsCourses() {
        return teacherRepository.count();
    }
}
