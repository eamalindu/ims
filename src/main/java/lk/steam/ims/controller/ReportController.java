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
        reportsAllView.addObject("title","Report All | STEAM IMS");
        reportsAllView.setViewName("Reports-All.html");
        reportsAllView.addObject("activeNavItem","reports");
        reportsAllView.addObject("activeReport","all");
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

    @GetMapping("/Reports-Registered")
    public ModelAndView registeredReport(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView reportsRegisteredView = new ModelAndView();
        reportsRegisteredView.addObject("username",auth.getName());
        reportsRegisteredView.addObject("title","Report Registered | STEAM IMS");
        reportsRegisteredView.setViewName("Reports-Registered.html");
        reportsRegisteredView.addObject("activeNavItem","reports");
        reportsRegisteredView.addObject("activeReport","registered");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        reportsRegisteredView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        reportsRegisteredView.addObject("loggedInDesignationName",loggedInDesignationName);
        reportsRegisteredView.addObject("loggedInImage",imageSrc);

        return reportsRegisteredView;
    }


    @GetMapping("/Reports-Completed")
    public ModelAndView completedReport(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView reportsRegisteredView = new ModelAndView();
        reportsRegisteredView.addObject("username",auth.getName());
        reportsRegisteredView.addObject("title","Report Completed | STEAM IMS");
        reportsRegisteredView.setViewName("Report-Completed.html");
        reportsRegisteredView.addObject("activeNavItem","reports");
        reportsRegisteredView.addObject("activeReport","completed");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        reportsRegisteredView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        reportsRegisteredView.addObject("loggedInDesignationName",loggedInDesignationName);
        reportsRegisteredView.addObject("loggedInImage",imageSrc);

        return reportsRegisteredView;
    }

    @GetMapping("/Reports-Dropped")
    public ModelAndView droppedReport(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView reportsDroppedView = new ModelAndView();
        reportsDroppedView.addObject("username",auth.getName());
        reportsDroppedView.addObject("title","Report Dropped | STEAM IMS");
        reportsDroppedView.setViewName("Report-Dropped.html");
        reportsDroppedView.addObject("activeNavItem","reports");
        reportsDroppedView.addObject("activeReport","dropped");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        reportsDroppedView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        reportsDroppedView.addObject("loggedInDesignationName",loggedInDesignationName);
        reportsDroppedView.addObject("loggedInImage",imageSrc);

        return reportsDroppedView;
    }

    @GetMapping("/Reports-Dropped-Without-Followups")
    public ModelAndView droppedFollowupReport(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView reportsDroppedFollowupView = new ModelAndView();
        reportsDroppedFollowupView.addObject("username",auth.getName());
        reportsDroppedFollowupView.addObject("title","Report Dropped without Followups | STEAM IMS");
        reportsDroppedFollowupView.setViewName("Report-NotFollowups.html");
        reportsDroppedFollowupView.addObject("activeNavItem","reports");
        reportsDroppedFollowupView.addObject("activeReport","followup");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        reportsDroppedFollowupView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        reportsDroppedFollowupView.addObject("loggedInDesignationName",loggedInDesignationName);
        reportsDroppedFollowupView.addObject("loggedInImage",imageSrc);

        return reportsDroppedFollowupView;
    }

    @GetMapping("/Reports-Commissions")
    public ModelAndView commissionsReport(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView reportsCommissionView = new ModelAndView();
        reportsCommissionView.addObject("username",auth.getName());
        reportsCommissionView.addObject("title","Report Dropped without Followups | STEAM IMS");
        reportsCommissionView.setViewName("Report-Commission.html");
        reportsCommissionView.addObject("activeNavItem","reports");
        reportsCommissionView.addObject("activeReport","commission");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        reportsCommissionView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        reportsCommissionView.addObject("loggedInDesignationName",loggedInDesignationName);
        reportsCommissionView.addObject("loggedInImage",imageSrc);

        return reportsCommissionView;
    }
}
