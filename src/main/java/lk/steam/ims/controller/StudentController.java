package lk.steam.ims.controller;

import lk.steam.ims.dao.StudentDAO;
import lk.steam.ims.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/Student")
public class StudentController {

    @Autowired
    private StudentDAO studentDAO;

    @PostMapping
    public String saveNewStudent(@RequestBody Student student){

        Student existStudent = studentDAO.getStudentsByIdValue(student.getIdValue());
        if(existStudent!=null){
            return "Duplicate NIC Value <br>Student Record Already Exists";
        }

        String nextStudentNumber = studentDAO.getNextStudentNumber();
        if(nextStudentNumber==null){
            nextStudentNumber = "ST-0001";
        }
        student.setStudentNumber(nextStudentNumber);
        student.setTimeStamp(LocalDateTime.now());
        try {
            studentDAO.save(student);
            return "OK";
        }
        catch (Exception ex){
            return "Update Failed " + ex.getMessage();
        }

    }

    @GetMapping(value = "/findall", produces = "application/json")
    public List<Student> findAll() {
        return studentDAO.findAll();
    }

    @GetMapping(value = "getStudentByIdValue/{idValue}",produces = "application/json")
    public Student getStudentByIdValue(@PathVariable String idValue) {
        return studentDAO.getStudentsByIdValue(idValue);
    }

    @GetMapping(value = "getStudentsByNicOrStudentNumberOrMobileNumber/{value}",produces = "application/json")
    public Student getStudentsByNicOrStudentNumberOrMobileNumber(@PathVariable String value) {
        return studentDAO.getStudentsByNicOrStudentNumberOrMobileNumber(value);
    }

    @GetMapping(value = "/edit")
    public ModelAndView studentEdit() {
        ModelAndView studentEditView = new ModelAndView();
        studentEditView.setViewName("studentedit.html");
        return studentEditView;
    }

}
