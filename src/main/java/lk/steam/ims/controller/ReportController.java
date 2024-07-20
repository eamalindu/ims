package lk.steam.ims.controller;

import lk.steam.ims.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Base64;

@RestController
public class ReportController {

    @Autowired
    private UserDAO userDAO;

    @GetMapping("/Reports-All")
    public ModelAndView allReports() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView reportsAllView = new ModelAndView();
        reportsAllView.addObject("username",auth.getName());
        reportsAllView.addObject("title","Counsellors' Performance | STEAM IMS");
        reportsAllView.setViewName("Reports-All.html");
        reportsAllView.addObject("activeNavItem","performanceAll");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        reportsAllView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        reportsAllView.addObject("loggedInDesignationName",loggedInDesignationName);
        reportsAllView.addObject("loggedInImage",imageSrc);

        return reportsAllView;
    }
}
