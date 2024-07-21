package lk.steam.ims.controller;

import lk.steam.ims.dao.RoleDAO;
import lk.steam.ims.entity.Batch;
import lk.steam.ims.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    private RoleDAO roleDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Role> findAll(){
        return roleDAO.findAll();
    }

    @GetMapping(value = "/getRolesWithoutAdmin",produces = "application/json")
    public List<Role> getRolesWithoutAdmin(){
        return roleDAO.getRolesWithoutAdmin();
    }
}
