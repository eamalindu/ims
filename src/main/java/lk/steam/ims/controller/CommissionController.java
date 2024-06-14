package lk.steam.ims.controller;

import lk.steam.ims.dao.CommissionDAO;
import lk.steam.ims.entity.Commission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Commission")
public class CommissionController {

    @Autowired
    private CommissionDAO commissionDAO;

    @GetMapping("/getCommissionByRegistrationID/{registrationID}")
    public Commission getCommissionByRegistrationID(@PathVariable Integer registrationID) {
        return commissionDAO.getCommissionByRegistrationID(registrationID);
    }

    @GetMapping("/getCommissionByDateRangeAndPaidTo/{startDate}/{endDate}")
    public List<Commission> getCommissionByDateRangeAndPaidTo(@PathVariable String startDate, @PathVariable String endDate) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return commissionDAO.getCommissionByDateRangeAndPaidTo(startDate, endDate, authentication.getName());
    }

}
