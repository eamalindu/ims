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
@RequestMapping("/Performance")
public class PerformanceController {

    @Autowired
    private UserDAO userDAO;

    @GetMapping
    public ModelAndView performanceUI(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView imsPerformanceView = new ModelAndView();
        imsPerformanceView.addObject("username",auth.getName());
        imsPerformanceView.addObject("title","Performance | STEAM IMS");
        imsPerformanceView.setViewName("performance.html");
        imsPerformanceView.addObject("activeNavItem","performance");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        imsPerformanceView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        imsPerformanceView.addObject("loggedInDesignationName",loggedInDesignationName);
        imsPerformanceView.addObject("loggedInImage",imageSrc);


        return imsPerformanceView;
    }

    @GetMapping(value = "/All")
    public ModelAndView performanceAllUI(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView imsPerformanceView = new ModelAndView();
        imsPerformanceView.addObject("username",auth.getName());
        imsPerformanceView.addObject("title","Counsellors' Performance | STEAM IMS");
        imsPerformanceView.setViewName("performanceAll.html");
        imsPerformanceView.addObject("activeNavItem","performanceAll");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        imsPerformanceView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        imsPerformanceView.addObject("loggedInDesignationName",loggedInDesignationName);
        imsPerformanceView.addObject("loggedInImage",imageSrc);

        return imsPerformanceView;
    }
}
