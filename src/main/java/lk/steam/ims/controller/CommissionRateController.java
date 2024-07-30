package lk.steam.ims.controller;

import lk.steam.ims.dao.CommissionRateDAO;
import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.CommissionRate;
import lk.steam.ims.entity.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/CommissionRate")
public class CommissionRateController {


    @Autowired
    private CommissionRateDAO commissionRateDAO;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private PrivilegeController privilegeController;


    @GetMapping("/getCommissionRateByCourseID/{courseID}")
    public CommissionRate getCommissionRateByCourseID(@PathVariable Integer courseID){
        return commissionRateDAO.getCommissionRateByCourseID(courseID);
    }

    @GetMapping("/findAll")
    public List<CommissionRate> findAll(){
        return commissionRateDAO.findAll();
    }

    @PostMapping
    public String saveNewCommissionRate(@RequestBody CommissionRate commissionRate){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"COMMISSION");

        if(!loggedUserPrivilege.getInsertPrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
        //check unique properties (They cant be already exist on the table)
        CommissionRate existCommissionRate = commissionRateDAO.getCommissionRateByCourseID(commissionRate.getCourseID().getId());
        if(existCommissionRate !=null){
            return "<br>Commission Rate already exist";
        }
        //set the created user
        commissionRate.setAddedBy(auth.getName());
        commissionRate.setTimestamp(LocalDateTime.now());
        commissionRateDAO.save(commissionRate);

        return "OK";

    }
    @PutMapping
    public String updateCommissionRate(@RequestBody CommissionRate commissionRate){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"COMMISSION");

        if(!loggedUserPrivilege.getUpdatePrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
        //check unique properties (They cant be already exist on the table)
        CommissionRate existCommissionRate = commissionRateDAO.getCommissionRateByCourseID(commissionRate.getCourseID().getId());
        if(existCommissionRate !=null){
            return "<br>Commission Rate already exist";
        }
        commissionRateDAO.save(commissionRate);
        return "OK";

    }

}
