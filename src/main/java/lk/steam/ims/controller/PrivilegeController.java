package lk.steam.ims.controller;

import lk.steam.ims.dao.PrivilegeDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/Privilege")
public class PrivilegeController {

    @Autowired
    private PrivilegeDAO privilegeDAO;

    @GetMapping
    public ModelAndView privilegeUI(){
        ModelAndView privilegeView = new ModelAndView();
        privilegeView.setViewName("privileges.html");
        return  privilegeView;
    }

}
