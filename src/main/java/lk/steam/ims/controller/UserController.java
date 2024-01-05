package lk.steam.ims.controller;

import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/User")
public class UserController {

    @Autowired
    private UserDAO userDAO;

    @GetMapping
    public ModelAndView userUI(){
        ModelAndView userView = new ModelAndView();
        userView.setViewName("user.html");
        return  userView;
    }

    @GetMapping(value = "/findall")
    public List<User> findAll(){
        return userDAO.findAll();
    }
}
