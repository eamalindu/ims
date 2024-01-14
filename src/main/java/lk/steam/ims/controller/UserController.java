package lk.steam.ims.controller;

import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
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

    @PostMapping
    public String saveNewUser(@RequestBody User user){
        try{
            user.setAddedTime(LocalDateTime.now());
            userDAO.save(user);
            return "OK";
        }
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }

    }
}
