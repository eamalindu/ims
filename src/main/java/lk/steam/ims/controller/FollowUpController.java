package lk.steam.ims.controller;

import lk.steam.ims.dao.FollowUpDAO;
import lk.steam.ims.dao.InquiryDAO;
import lk.steam.ims.entity.FollowUp;
import lk.steam.ims.entity.Inquiry;
import lk.steam.ims.entity.InquiryStatus;
import org.springframework.beans.factory.annotation.Autowired;
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

        try {

            if (followUp.getInquiryId().getInquiryStatusId().getId()==1) {
                //This means the current inquiry is a new inquiry
                //Need to change the inquiry status from new inquiry to processing

                //get inquiry from the followUp object
                Inquiry currentInquiry = inquiryDAO.getReferenceById(followUp.getInquiryId().getId());
                //change inquiry status to 2
                currentInquiry.setInquiryStatusId(new InquiryStatus(2, "Processing"));


                //set auto generated values
                followUp.setFollowUpTime(LocalDateTime.now());
                followUp.setAddedBy("User1");
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
                return "<br>This Inquiry is Already Registered! <br><br><small class='text-muted'>Followups cannot be added to <b>Registered</b> Inquiries<small>";

            } else if (followUp.getInquiryId().getInquiryStatusId().getId() == 4) {
                //This means the current inquiry is a dropped inquiry
                //no followups cannot be added
                return "<br>This Inquiry is Dropped! <br><br><small class='text-muted'>Followups cannot be added to <b>Dropped</b> Inquiries<small>";
            } else {
                //This means the current inquiry is a processing inquiry
                //followups can be added

                //get inquiry from the followUp object
                Inquiry currentInquiry = inquiryDAO.getReferenceById(followUp.getInquiryId().getId());
                //set auto generated values
                followUp.setFollowUpTime(LocalDateTime.now());
                followUp.setAddedBy("User1");

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
