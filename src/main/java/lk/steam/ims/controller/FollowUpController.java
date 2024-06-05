package lk.steam.ims.controller;

import lk.steam.ims.dao.FollowUpDAO;
import lk.steam.ims.dao.InquiryDAO;
import lk.steam.ims.dao.InquiryStatusDAO;
import lk.steam.ims.entity.FollowUp;
import lk.steam.ims.entity.Inquiry;
import lk.steam.ims.entity.InquiryStatus;
import lk.steam.ims.entity.Privilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/followup")
public class FollowUpController {
    @Autowired
    private FollowUpDAO followUpDAO;

    @Autowired
    private InquiryDAO inquiryDAO;
    @Autowired
    private PrivilegeController privilegeController;
    @Autowired
    private InquiryStatusDAO inquiryStatusDAO;


    @GetMapping(value = "/findall", produces = "application/json")
    public List<FollowUp> findAll() {
        return followUpDAO.findAll();
    }

    @GetMapping(value = "/latestFollowup", produces = "application/json")
    public List<FollowUp> latestFollowupForEachInquiry() {
        return followUpDAO.latestFollowupForEachInquiry();
    }

    @GetMapping(value = "/getById/{id}", produces = "application/json")
    public List<FollowUp> getAllFollowUpsByInquiryId(@PathVariable("id") Integer inquiryID ){
        return followUpDAO.getAllFollowUpsByInquiryId(inquiryID);
    }

    @PostMapping
    public String saveNewFollowup(@RequestBody FollowUp followUp) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Privilege loggedUserPrivilege = privilegeController.getPrivilegeByUserAndModule(auth.getName(),"FOLLOWUP");

        if(!loggedUserPrivilege.getInsertPrivilege()){
            return "<br>User does not have sufficient privilege.";
        }

        try {

            if (followUp.getInquiryId().getInquiryStatusId().getId()==1) {
                //This means the current inquiry is a new inquiry
                //Need to change the inquiry status from new inquiry to processing

                //get inquiry from the followUp object
                Inquiry currentInquiry = inquiryDAO.getReferenceById(followUp.getInquiryId().getId());
                //change inquiry status to 2
                currentInquiry.setInquiryStatusId(inquiryStatusDAO.getReferenceById(2));


                //set auto generated values
                followUp.setFollowUpTime(LocalDateTime.now());
                followUp.setAddedBy(auth.getName());
                //save followup
                FollowUp currentFollowup = followUpDAO.save(followUp);

                currentInquiry.setLatestFollowUpID(currentFollowup.getId());
                currentInquiry.setNextFollowUpDateTime(currentFollowup.getNextFollowup());

                //save inquiry
                inquiryDAO.save(currentInquiry);
                return "OK";

            } else if (followUp.getInquiryId().getInquiryStatusId().getId() == 3) {
                //This means the current inquiry is a registered inquiry
                //no followups cannot be added
                return "<br>This Inquiry is Already Registered! <br><br><small class='text-muted'>Followups cannot be added to <span class='text-purple'>Registered</span> Inquiries<small>";

            } else if (followUp.getInquiryId().getInquiryStatusId().getId() == 4) {
                //This means the current inquiry is a dropped inquiry
                //no followups cannot be added
                return "<br>This Inquiry is Dropped! <br><br><small class='text-muted'>Followups cannot be added to <span class='text-purple'>Dropped</span> Inquiries<small>";
            } else if (followUp.getInquiryId().getInquiryStatusId().getId() == 5) {
                //This means the current inquiry is a dropped inquiry
                //no followups cannot be added
                return "<br>This Inquiry is Completed! <br><br><small class='text-muted'>Followups cannot be added to <span class='text-purple'>Completed</span> Inquiries<small>";
            }

            else {
                //This means the current inquiry is a processing inquiry
                //followups can be added

                //get inquiry from the followUp object
                Inquiry currentInquiry = inquiryDAO.getReferenceById(followUp.getInquiryId().getId());
                //set auto generated values
                followUp.setFollowUpTime(LocalDateTime.now());
                followUp.setAddedBy(auth.getName());

                FollowUp currentFollowup = followUpDAO.save(followUp);

                currentInquiry.setLatestFollowUpID(currentFollowup.getId());
                currentInquiry.setNextFollowUpDateTime(currentFollowup.getNextFollowup());

                //save inquiry
                inquiryDAO.save(currentInquiry);

                return "OK";

            }


        } catch (Exception ex) {
            return "Save Failed " + ex.getMessage();
        }

    }

}
