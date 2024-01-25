package lk.steam.ims.controller;

import lk.steam.ims.dao.PrivilegeDAO;
import lk.steam.ims.entity.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

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

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Privilege> findAll(){
        return privilegeDAO.findAll();
    }

    @PostMapping
    public String saveNewPrivilege(@RequestBody Privilege privilege){
        try{
            privilegeDAO.save(privilege);
            return "OK";
        }
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }
    }

    @PutMapping
    public String updatePrivilege(@RequestBody Privilege privilege){

        try{
            privilegeDAO.save(privilege);
            return "OK";
        }
        catch (Exception ex){
            return "Update Failed "+ex.getMessage();
        }
    }

}
