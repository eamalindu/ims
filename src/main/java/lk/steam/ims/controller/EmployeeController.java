package lk.steam.ims.controller;

import lk.steam.ims.dao.EmployeeDAO;
import lk.steam.ims.dao.EmployeeStatusDAO;
import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.Employee;
import lk.steam.ims.entity.EmployeeStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/Employee")
public class EmployeeController {

    @Autowired
    private EmployeeDAO employeeDAO;
    @Autowired
    private EmployeeStatusDAO employeeStatusDAO;
    @Autowired
    private UserDAO userDAO;

    @GetMapping
    public ModelAndView employeeUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ModelAndView employeeView = new ModelAndView();
        employeeView.setViewName("employee.html");

        employeeView.addObject("username",auth.getName());
        employeeView.addObject("title","Manage Employees | STEAM IMS");
        employeeView.addObject("activeNavItem","employee");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        employeeView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        employeeView.addObject("loggedInDesignationName",loggedInDesignationName);
        return employeeView;
    }

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Employee> findAll(){

        return employeeDAO.findAll();
    }

    @GetMapping(value = "/GetEmployeesWithoutUserAccount",produces = "application/json")
    public List<Employee> getEmployeesWithoutUserAccount(){

        return employeeDAO.getEmployeesWithoutUserAccount();
    }

    @GetMapping(value = "/getActiveCounsellors",produces = "application/json")
    public List<Employee> getActiveCounsellors(){
        return employeeDAO.getActiveCounsellors();
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
            //check unique values exist or not
            String errors = "";

            Employee existingEmployeeEmail = employeeDAO.getEmployeeByEmail(employee.getEmail());
            if(existingEmployeeEmail!=null) {
                errors += "<br>This Email Already Exists";
            }
            Employee existingEmployeeNIC = employeeDAO.getEmployeeByNIC(employee.getNic());
            if(existingEmployeeNIC!=null) {
                errors+= "<br>This NIC Already Exists";
            }
            Employee existingEmployeeMobileNumber = employeeDAO.getEmployeeByMobileNumber(employee.getMobileNumber());
            if(existingEmployeeMobileNumber!=null) {
                errors+= "<br>This Mobile Number Already Exists";
            }
            if(!errors.isEmpty()){
                return errors;
            }

            employee.setAdded_timestamp(LocalDateTime.now());
            employee.setEmployeeID(employeeDAO.getNextEmployeeID());
            employee.setEmployeeStatusID(employeeStatusDAO.getReferenceById(1));
            Employee savedEmployee =  employeeDAO.save(employee);

            return "OK";
        }
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }

    }
    @DeleteMapping
    public String deleteEmployee(@RequestBody Employee employee) {

        try {
            //soft delete
            //change employee Status to delete
            EmployeeStatus deleteStatus = employeeStatusDAO.getReferenceById(3);
            employee.setEmployeeStatusID(deleteStatus);
            //update the employee record
            employeeDAO.save(employee);

            return "OK";
        } catch (Exception ex) {
            return "Delete Failed " + ex.getMessage();
        }
    }

}
