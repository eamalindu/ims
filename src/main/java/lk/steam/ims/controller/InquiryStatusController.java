package lk.steam.ims.controller;

import lk.steam.ims.dao.InquiryStatusDAO;
import lk.steam.ims.entity.InquiryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/InquiryStatus")
public class InquiryStatusController {

    @Autowired
    private InquiryStatusDAO inquiryStatusDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<InquiryStatus> findAll(){
        return inquiryStatusDAO.findAll();
    }
}
