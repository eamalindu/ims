package lk.steam.ims.controller;

import lk.steam.rms.dao.RegistrationStatusDAO;
import lk.steam.rms.entity.RegistrationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/RegistrationStatus")
public class RegistrationStatusController {
    @Autowired
    private RegistrationStatusDAO registrationStatusDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<RegistrationStatus> findAll(){
        return registrationStatusDAO.findAll();
    }
}
