package lk.steam.ims.controller;

import lk.steam.ims.dao.CommissionRateDAO;
import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.CommissionRate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/CommissionRate")
public class CommissionRateController {


    @Autowired
    private CommissionRateDAO commissionRateDAO;
    @Autowired
    private UserDAO userDAO;


    @GetMapping("/getCommissionRateByCourseID/{courseID}")
    public CommissionRate getCommissionRateByCourseID(@PathVariable Integer courseID){
        return commissionRateDAO.getCommissionRateByCourseID(courseID);
    }

    @GetMapping("/findAll")
    public List<CommissionRate> findAll(){
        return commissionRateDAO.findAll();
    }

}
