package lk.steam.ims.controller;

import jakarta.transaction.Transactional;
import lk.steam.ims.dao.*;
import lk.steam.ims.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/Registration")
public class RegistrationController {

    @Autowired
    private RegistrationDAO registrationDAO;

    @Autowired
    private StudentDAO studentDAO;

    @Autowired
    private RegistrationStatusDAO registrationStatusDAO;

    @Autowired
    private InquiryDAO inquiryDAO;

    @Autowired
    private InquiryStatusDAO inquiryStatusDAO;

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private PrivilegeController privilegeController;


    @GetMapping(value = "/findall", produces = "application/json")
    public List<Registrations> findAll() {
        //sorting the data DESC format
        Sort sort = Sort.by(Sort.Direction.DESC, "registrationNumber");
        return registrationDAO.findAll(sort);
    }

    @GetMapping(value = "getRegistrations/{batchID}", produces = "application/json")
    public List<Registrations> getBatchInfoByBatchCode(@PathVariable Integer batchID) {
        return registrationDAO.getRegistrationsByBatchID(batchID);
    }

    @GetMapping(value = "getRegistration/{id}", produces = "application/json")
    public Registrations getRegistrationByID(@PathVariable Integer id) {
        return registrationDAO.getRegistrationsByID(id);
    }

    @GetMapping(value = "getRegistrationFromBatchAndStudentNIC/{batchID}/{studentNIC}", produces = "application/json")
    public Registrations getRegistrationFromBatchAndStudentNIC(@PathVariable Integer batchID, @PathVariable String studentNIC) {
        return registrationDAO.getRegistrationsByBatchIDAndStudentNIC(batchID, studentNIC);
    }

    @GetMapping(value = "getRegistrationByRegistrationNumber/{registrationNumber}", produces = "application/json")
    public Registrations getRegistrationsByRegistrationNumber(@PathVariable String registrationNumber) {
        return registrationDAO.getRegistrationsByRegistrationNumber(registrationNumber);
    }

    @GetMapping(value = "getRegistrationHaveClassToday/{registrationNumber}", produces = "application/json")
    public Registrations getRegistrationHaveClassToday(@PathVariable String registrationNumber) {
        return registrationDAO.getRegistrationHaveClassToday(registrationNumber);
    }

    @GetMapping(value = "getMonthlyRegistrationByCourseID/{courseID}", produces = "application/json")
    public List<Registrations> getMonthlyRegistrationByCourseID(@PathVariable Integer courseID) {
        return registrationDAO.getMonthlyRegistrationByCourseID(courseID);
    }

    @GetMapping(value = "getMonthlyDueRegistration/{startDate}/{endDate}",produces = "application/json")
    public List<Registrations> getMonthlyDueRegistration(@PathVariable String startDate, @PathVariable String endDate) {
        return registrationDAO.getMonthlyDueRegistration(startDate,endDate);
    }

    @GetMapping(value = "getCounsellors/{startDate}/{endDate}",produces = "application/json")
    public List<String> getCounsellorsByMonth(@PathVariable String startDate, @PathVariable String endDate) {
        return registrationDAO.getCounsellorsByMonth(startDate,endDate);
    }

    @GetMapping(value = "getRegistrationCountByCounsellorsByMonth/{startDate}/{endDate}/{counsellor}",produces = "application/json")
    public Integer getRegistrationCountByCounsellorsByMonth(@PathVariable String startDate, @PathVariable String endDate,@PathVariable String counsellor) {
        return registrationDAO.getRegistrationCountByCounsellorsByMonth(startDate,endDate,counsellor);
    }

}

