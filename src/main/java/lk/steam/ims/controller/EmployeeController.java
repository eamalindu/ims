package lk.steam.ims.controller;

import lk.steam.ims.dao.EmployeeDAO;
import lk.steam.ims.dao.EmployeeStatusDAO;
import lk.steam.ims.dao.RoleDAO;
import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.*;
import lk.steam.ims.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/Employee")
public class EmployeeController {

    @Autowired
    private EmployeeDAO employeeDAO;
    @Autowired
    private EmployeeStatusDAO employeeStatusDAO;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private RoleDAO roleDAO;
    @Autowired
    private MailService mailService;
    @Autowired
    private PrivilegeController privilegeController;

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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"EMPLOYEE");

        if(!loggedUserPrivilege.getUpdatePrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"EMPLOYEE");

        if(!loggedUserPrivilege.getInsertPrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
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

            //check the selected Designation need a user account or not
            if(savedEmployee.getDesignationID().getUserAccountNeeded()){
                User user = new User();
                user.setEmployeeID(savedEmployee);
                user.setEmail(savedEmployee.getEmail());
                user.setUsername(savedEmployee.getEmployeeID());
                user.setStatus(true);
                user.setAddedTime(LocalDateTime.now());
                user.setNote("Auto Generated User Account");
                user.setPassword(bCryptPasswordEncoder.encode(savedEmployee.getNic()));

                Set<Role> userRoles = new HashSet<>();
                Role roles = roleDAO.getRoleByName(savedEmployee.getDesignationID().getDesignation());
                userRoles.add(roles);
                user.setRoles(userRoles);
                userDAO.save(user);
                //send email
                mailService.sendWelcomeUserMail(savedEmployee.getEmail(),savedEmployee.getEmployeeID(),savedEmployee.getFullName());
            }

            return "OK";
        }
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }

    }
    @DeleteMapping
    public String deleteEmployee(@RequestBody Employee employee) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"EMPLOYEE");

        if(!loggedUserPrivilege.getDeletePrivilege()){
            return "<br>User does not have sufficient privilege.";
        }

        try {
            //soft delete
            //change employee Status to delete
            EmployeeStatus deleteStatus = employeeStatusDAO.getReferenceById(3);
            employee.setEmployeeStatusID(deleteStatus);
            //update the employee record
            employeeDAO.save(employee);
            //get the user account and delete it
            User user = userDAO.getUserByEmployeeID(employee.getId());
            if(user!=null){
                user.setStatus(false);
                userDAO.save(user);
            }

            return "OK";
        } catch (Exception ex) {
            return "Delete Failed " + ex.getMessage();
        }
    }

}
