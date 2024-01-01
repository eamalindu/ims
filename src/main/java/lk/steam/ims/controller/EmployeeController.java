package lk.steam.ims.controller;

import lk.steam.ims.dao.EmployeeDAO;
import lk.steam.ims.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/Employee")
public class EmployeeController {

    @Autowired
    private EmployeeDAO employeeDAO;
    @GetMapping
    public ModelAndView employeeUI() {
        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");
        return employeeView;
    }

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Employee> findAll(){

        return employeeDAO.findAll();
    }
    @PutMapping
    public String updateEmployee(@RequestBody Employee employee){
        try {
            //no need to check anything, because there are no any unique values
            employeeDAO.save(employee);
            return "OK";

        }
        catch (Exception ex){
            return "Update Failed "+ex.getMessage();
        }

    }
    @PostMapping
    public String saveNewEmployee(@RequestBody Employee employee){
        try{
            //set auto generated values
            employee.setAdded_timestamp(LocalDateTime.now());
            employee.setEmployeeID("EMP003");

            employeeDAO.save(employee);
            return "OK";
        }
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }

    }

}
