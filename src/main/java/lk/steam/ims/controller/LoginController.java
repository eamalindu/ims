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
public class LoginController {

    @Autowired
    private UserDAO userDAO;

    public LoginController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @GetMapping(value = "/login")
    public ModelAndView loginUI(){
        ModelAndView loginView = new ModelAndView();
        loginView.setViewName("login.html");
        return loginView;
    }

    @GetMapping(value = "/error")
    public ModelAndView errorUI(){
        ModelAndView errorView = new ModelAndView();
        errorView.setViewName("error.html");
        return errorView;
    }

    @GetMapping(value = "/Dashboard")
    public ModelAndView imsDashboard(){


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ModelAndView imsView = new ModelAndView();
        imsView.setViewName("dashboard.html");
        imsView.addObject("username",auth.getName());
        imsView.addObject("title","Dashboard | STEAM IMS");
        imsView.addObject("activeNavItem","dashboard");
        String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
        String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
        byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
        String base64Image = Base64.getEncoder().encodeToString(photoBytes);
        String imageSrc = "data:image/png;base64," + base64Image;
        imsView.addObject("loggedInEmployeeName",loggedInEmployeeName);
        imsView.addObject("loggedInDesignationName",loggedInDesignationName);
        imsView.addObject("loggedInImage",imageSrc);
        return imsView;
    }
}
