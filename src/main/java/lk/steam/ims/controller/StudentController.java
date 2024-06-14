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

}
