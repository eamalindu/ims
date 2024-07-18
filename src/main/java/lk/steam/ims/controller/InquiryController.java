package lk.steam.ims.controller;

import lk.steam.ims.dao.InquiryDAO;
import lk.steam.ims.dao.InquiryStatusDAO;
import lk.steam.ims.entity.Inquiry;
import lk.steam.ims.entity.InquiryStatus;
import lk.steam.ims.entity.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/Inquiry")
public class InquiryController {

    @Autowired
    private InquiryDAO inquiryDAO;
    @Autowired
    private PrivilegeController privilegeController;
    @Autowired
    private InquiryStatusDAO inquiryStatusDAO;

    //data returnType => 'produces ="application/JSON"'
    //it can be either JSON,Text and XML

    //value = 'employee/findall' (<= how the browser will display it)
    // employee is added from the class level mapping
    @GetMapping(value = "/findall",produces = "application/json")
    public List<Inquiry> findAll(){
        return inquiryDAO.findAll();
    }

    @GetMapping(value = "/active",produces = "application/json")
    public List<Inquiry> findActiveInquiry(){
         return inquiryDAO.findActiveInquiry();
    }

    @GetMapping(value = "/registered",produces = "application/json")
    public List<Inquiry> findRegisteredInquiry(){
        return inquiryDAO.findRegisteredInquiry();
    }

    @GetMapping(value = "/dropped",produces = "application/json")
    public List<Inquiry> findDroppedInquiry(){
        return inquiryDAO.findDroppedInquiry();
    }

    @GetMapping(value = "/newInquiry",produces = "application/json")
    public List<Inquiry> findNewInquiry(){
        return inquiryDAO.findNewInquiry();
    }

    @GetMapping(value = "/processingInquiry",produces = "application/json")
    public List<Inquiry> findProcessingInquiry(){
        return inquiryDAO.findProcessingInquiry();
    }

    @GetMapping(value = "/getInquiryByDateRangeAndStatus/{startDate}/{endDate}/{status}",produces = "application/json")
    public List<Inquiry> getInquiryByDateRangeAndStatus(@PathVariable String startDate, @PathVariable String endDate, @PathVariable String status){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        LocalDate  start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return inquiryDAO.getInquiryByDateRangeAndStatus(start,end,status,auth.getName());
    }

    @GetMapping(value = "/getInquiryByDateRangeAndStatusAndAddedBy/{startDate}/{endDate}/{status}/{addedBy}",produces = "application/json")
    public List<Inquiry> getInquiryByDateRangeAndStatusAndAddedBy(@PathVariable String startDate, @PathVariable String endDate, @PathVariable String status,@PathVariable String addedBy){
        LocalDate  start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return inquiryDAO.getInquiryByDateRangeAndStatus(start,end,status,addedBy);
    }

    @GetMapping(value = "/test",produces = "application/json")
    public List<Map<String,Object>> test(){
        return inquiryDAO.test();
    }

    @GetMapping(value = "/getInquiriesWithFollowUpsToday",produces = "application/json")
    public List<Inquiry> getInquiriesWithFollowUpsToday(){
        return inquiryDAO.getInquiriesWithFollowUpsToday();
    }

    @GetMapping(value = "/newinquirycount",produces = "application/json")
    public String newInquiryCount(){
        return inquiryDAO.getNewInquiryCount();
    }

    @GetMapping(value = "/getCounsellors/{startDate}/{endDate}",produces = "application/json")
    public List<String> getCounsellorsByDates(@PathVariable String startDate,@PathVariable String endDate){
        return inquiryDAO.getCounsellorsByDates(startDate,endDate);
    }

    @GetMapping(value = "/getInquiriesByDateRangeAndCourse/{startDate}/{endDate}/{courseId}",produces = "application/json")
    public List<Inquiry> getInquiriesByDateRangeAndCourse(@PathVariable String startDate,@PathVariable String endDate,@PathVariable Integer courseId){
        return inquiryDAO.getInquiriesByDateRangeAndCourse(startDate,endDate,courseId);
    }

    @GetMapping(value = "/getInquiriesByDateRangeAndSource/{startDate}/{endDate}/{sourceID}",produces = "application/json")
    public List<Inquiry> getInquiriesByDateRangeAndSource(@PathVariable String startDate,@PathVariable String endDate,@PathVariable Integer sourceID){
        return inquiryDAO.getInquiriesByDateRangeAndSource(startDate,endDate,sourceID);
    }

    @PostMapping
    public String saveNewInquiry(@RequestBody Inquiry inquiry){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"INQUIRY");

        if(!loggedUserPrivilege.getInsertPrivilege()){
            return "<br>User does not have sufficient privilege.";
        }

        //check unique properties (They cant be already exist on the table)
        //no unique properties in this table
        try {

            //set autogenerated values
            inquiry.setAddedBy(auth.getName());
            inquiry.setTimeStamp(LocalDateTime.now());

            //set inquiryStatus as 1 (New Inquiry)
            inquiry.setInquiryStatusId(inquiryStatusDAO.getReferenceById(1));

            //set InquiryNumber
            String inqNextNumber = inquiryDAO.getNextInquiryNumber();

            if(inqNextNumber==null||inqNextNumber.length()==0||inqNextNumber.isEmpty()){
                inquiry.setInquiryNumber("000001");
            }
            else{
                inquiry.setInquiryNumber(inqNextNumber);
            }


            inquiryDAO.save(inquiry);
            return "OK";
        }
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }
    }


    @PutMapping
    public String updateInquiry(@RequestBody Inquiry inquiry){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"INQUIRY");

        if(!loggedUserPrivilege.getUpdatePrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
        try {
            //no need to check anything, because there are no any unique values
            inquiryDAO.save(inquiry);
            return "OK";

        }
        catch (Exception ex){
            return "Update Failed "+ex.getMessage();
        }

    }
    @DeleteMapping
    public String deleteInquiry(@RequestBody Inquiry inquiry){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"INQUIRY");

        if(!loggedUserPrivilege.getDeletePrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
        try {
            //no need to check anything, because there are no any unique values
            inquiry.setInquiryStatusId(inquiryStatusDAO.getReferenceById(4));
            inquiryDAO.save(inquiry);
            return "OK";

        }
        catch (Exception ex){
            return "Update Failed "+ex.getMessage();
        }

    }

}
