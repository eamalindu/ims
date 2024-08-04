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

    //value = 'Inquiry/findall' (<= how the browser will display it)
    // Inquiry is added from the class level mapping
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

    //get inquiries by date range and status
    @GetMapping(value = "/getInquiryByDateRangeAndStatus/{startDate}/{endDate}/{status}",produces = "application/json")
    public List<Inquiry> getInquiryByDateRangeAndStatus(@PathVariable String startDate, @PathVariable String endDate, @PathVariable String status){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        LocalDate  start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return inquiryDAO.getInquiryByDateRangeAndStatus(start,end,status,auth.getName());
    }

    //get inquiries by date range and status and addedBy
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

    //get inquiries that have followups today
    @GetMapping(value = "/getInquiriesWithFollowUpsToday",produces = "application/json")
    public List<Inquiry> getInquiriesWithFollowUpsToday(){
        return inquiryDAO.getInquiriesWithFollowUpsToday();
    }

    //get new inquiries count
    @GetMapping(value = "/newinquirycount",produces = "application/json")
    public String newInquiryCount(){
        return inquiryDAO.getNewInquiryCount();
    }

    //get counsellors by date range
    @GetMapping(value = "/getCounsellors/{startDate}/{endDate}",produces = "application/json")
    public List<String> getCounsellorsByDates(@PathVariable String startDate,@PathVariable String endDate){
        return inquiryDAO.getCounsellorsByDates(startDate,endDate);
    }

    //get inquiries by date range and counsellor
    @GetMapping(value = "/getInquiriesByDateRangeAndCourse/{startDate}/{endDate}/{courseId}",produces = "application/json")
    public List<Inquiry> getInquiriesByDateRangeAndCourse(@PathVariable String startDate,@PathVariable String endDate,@PathVariable Integer courseId){
        return inquiryDAO.getInquiriesByDateRangeAndCourse(startDate,endDate,courseId);
    }

    //get inquiries by date range and course for logged in user
    @GetMapping(value = "/getInquiriesByDateRangeAndCourseForLoggedInUser/{startDate}/{endDate}/{courseId}",produces = "application/json")
    public List<Inquiry> getInquiriesByDateRangeAndCourseForLoggedInUser(@PathVariable String startDate,@PathVariable String endDate,@PathVariable Integer courseId){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return inquiryDAO.getInquiriesByDateRangeAndCourseForLoggedInUser(startDate,endDate,courseId,auth.getName());
    }

    //get inquiries by date range and source
    @GetMapping(value = "/getInquiriesByDateRangeAndSource/{startDate}/{endDate}/{sourceID}",produces = "application/json")
    public List<Inquiry> getInquiriesByDateRangeAndSource(@PathVariable String startDate,@PathVariable String endDate,@PathVariable Integer sourceID){
        return inquiryDAO.getInquiriesByDateRangeAndSource(startDate,endDate,sourceID);
    }

    //get registered inquiries this month
    @GetMapping(value="/registeredInquiriesThisMonth/{startDate}/{endDate}",produces = "application/json")
    public List<Inquiry> getRegisteredInquiriesThisMonth(@PathVariable String startDate,@PathVariable String endDate){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return inquiryDAO.getRegisteredInquiriesThisMonth(startDate,endDate,auth.getName());
    }

    //get all inquireis by date range
    @GetMapping(value = "/getAllInquiriesByDateRange/{startDate}/{endDate}",produces = "application/json")
    public List<Inquiry> getAllInquiriesByDateRange(@PathVariable String startDate,@PathVariable String endDate){
        return inquiryDAO.getAllInquiriesByDateRange(startDate,endDate);
    }

    //get all inquiries by date range and status
    @GetMapping(value = "/getAllInquiriesByDateRangeAndStatus/{startDate}/{endDate}/{status}",produces = "application/json")
    public List<Inquiry> getAllInquiriesByDateRangeAndStatus(@PathVariable String startDate,@PathVariable String endDate, @PathVariable String status){
        return inquiryDAO.getAllInquiriesByDateRangeAndStatus(startDate,endDate,status);
    }

    //get all inquiries without followUps by date range
    @GetMapping(value = "/getDroppedInquiriesWithoutFollowUpsByDateRange/{startDate}/{endDate}",produces = "application/json")
        public List<Inquiry> getDroppedInquiriesWithoutFollowUpsByDateRange(@PathVariable String startDate,@PathVariable String endDate){
        return inquiryDAO.getDroppedInquiriesWithoutFollowUpsByDateRange(startDate,endDate);
    }

    //get inquiry from inquiry number
    @GetMapping(value="/getInquiryNumberByID/{id}",produces = "application/json")
    public Inquiry getInquiryNumberById(@PathVariable Integer id){
        return inquiryDAO.getInquiryNumberById(id);
    }

    //request url searchInquiry?startDate=2021-01-01&endDate=2021-01-31&sourceID=1&courseID=1&addedBy=lufna&input=0705368016
    @GetMapping(value = "/searchInquiry",params = {"startDate","endDate","sourceID","courseID","addedBy","input"},produces = "application/json")
    public List<Inquiry> searchInquiry(@RequestParam String startDate,@RequestParam String endDate,@RequestParam Integer sourceID,@RequestParam Integer courseID,@RequestParam String addedBy,@RequestParam String input){
        return inquiryDAO.searchInquiry(startDate,endDate,sourceID,courseID,addedBy,input);
    }

    //search an inquiry by the given input
    //ok for nic, inquiry number and mobile number
    @GetMapping(value = "/searchInquiryByInput/{input}",produces = "application/json")
    public List<Inquiry> searchInquiryByInput(@PathVariable String input){
        return inquiryDAO.searchInquiryByInput(input);
    }
    //search an inquiry by the given input and date range
    //ok for nic, inquiry number and mobile number
    @GetMapping(value = "/searchInquiryByDateRangeAndInput/{startDate}/{endDate}/{input}",produces = "application/json")
    public List<Inquiry> searchInquiryByDateRangeAndInput(@PathVariable String startDate,@PathVariable String endDate,@PathVariable String input){
        return inquiryDAO.searchInquiryByDateRangeAndInput(startDate,endDate,input);
    }

    //save new inquiry
    @PostMapping
    public String saveNewInquiry(@RequestBody Inquiry inquiry){
        //get the logged user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //get the logged user privilege
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"INQUIRY");

        //check if the logged user has the insert privilege
        if(!loggedUserPrivilege.getInsertPrivilege()){
            return "<br>User does not have sufficient privilege.";
        }

        //check unique properties (They cant be already exist on the table)
        Inquiry existInquiry = inquiryDAO.getInquiryByCourseAndNiC(inquiry.getCourseId().getId(),inquiry.getIdValue());
        if(existInquiry!=null){
            return "<br>Inquiry already exist";
        }
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

            //save inquiry
            inquiryDAO.save(inquiry);
            return "OK";
        }
        //error handling
        catch (Exception ex){
            return "Save Failed "+ex.getMessage();
        }
    }


    //update inquiry
    @PutMapping
    public String updateInquiry(@RequestBody Inquiry inquiry){
        //get the logged user
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //get the logged user privilege
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"INQUIRY");

        //check if the logged user has the update privilege
        if(!loggedUserPrivilege.getUpdatePrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
        try {
            //check if the active inquiry is present with nic and mobile number
            Inquiry existInquiry = inquiryDAO.getInquiryByCourseAndNiC(inquiry.getCourseId().getId(),inquiry.getIdValue());
            if(existInquiry!=null && existInquiry.getId()!=inquiry.getId()){
                return "<br>Updated Failed!<br>Inquiry With Same Course and NIC already exist in the system";
            }
            //save inquiry
            inquiryDAO.save(inquiry);
            return "OK";

        }
        catch (Exception ex){
            return "Update Failed "+ex.getMessage();
        }

    }
    //delete inquiry
    @DeleteMapping
    public String deleteInquiry(@RequestBody Inquiry inquiry){
        //get loggedin user auth
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //get privilege for the user
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"INQUIRY");

        if(!loggedUserPrivilege.getDeletePrivilege()){
            return "<br>User does not have sufficient privilege.";
        }
        Inquiry existInquiry = inquiryDAO.getReferenceById(inquiry.getId());
        if (existInquiry == null) {
            return "No Such Inquiry Record";
        }
        try {
            //no need to check anything, because there are no any unique values
            //soft delete
            inquiry.setInquiryStatusId(inquiryStatusDAO.getReferenceById(4));
            inquiryDAO.save(inquiry);
            return "OK";

        }
        catch (Exception ex){
            return "Update Failed "+ex.getMessage();
        }

    }

}
