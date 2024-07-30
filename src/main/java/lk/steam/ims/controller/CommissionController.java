package lk.steam.ims.controller;

import lk.steam.ims.dao.CommissionDAO;
import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.Commission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/Commission")
public class CommissionController {

    @Autowired
    private CommissionDAO commissionDAO;
    @Autowired
    private UserDAO userDAO;

    @GetMapping("/getCommissionByRegistrationID/{registrationID}")
    public Commission getCommissionByRegistrationID(@PathVariable Integer registrationID) {
        return commissionDAO.getCommissionByRegistrationID(registrationID);
    }

    @GetMapping("/getCommissionByDateRangeAndPaidTo/{startDate}/{endDate}")
    public List<Commission> getCommissionByDateRangeAndPaidTo(@PathVariable String startDate, @PathVariable String endDate) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return commissionDAO.getCommissionByDateRangeAndPaidTo(startDate, endDate, authentication.getName());
    }

    @GetMapping("/getCommissionByDateRangeAndCounsellor/{startDate}/{endDate}/{counsellor}")
    public List<Commission> getCommissionByDateRangeAndPaidTo(@PathVariable String startDate, @PathVariable String endDate, @PathVariable String counsellor) {
        return commissionDAO.getCommissionByDateRangeAndPaidTo(startDate, endDate, counsellor);
    }

    @GetMapping()
    public ModelAndView commissionUI(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ModelAndView commissionView = new ModelAndView();
        commissionView.setViewName("commission.html");

        commissionView.addObject("username",auth.getName());
        commissionView.addObject("title","Commissions | STEAM IMS");
        commissionView.addObject("activeNavItem","commissionAll");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        commissionView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        commissionView.addObject("loggedInDesignationName",loggedInDesignationName);
        commissionView.addObject("loggedInImage",imageSrc);;
        return commissionView;
    }

}
