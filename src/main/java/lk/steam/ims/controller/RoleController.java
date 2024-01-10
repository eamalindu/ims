package lk.steam.ims.controller;

import lk.steam.ims.dao.RoleDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    private RoleDAO roleDAO;


}
