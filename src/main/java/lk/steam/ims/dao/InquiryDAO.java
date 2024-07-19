package lk.steam.ims.dao;

import lk.steam.ims.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface InquiryDAO extends JpaRepository<Inquiry,Integer> {

    //display all the active inquiries (New and Processing)
    //without any follow-ups
    @Query(value = "SELECT * FROM inquiry WHERE inquirystatus_id =1 OR inquirystatus_id=2",nativeQuery = true)
    List<Inquiry> findActiveInquiry();

    //display all the Registered Inquiries
    //This data will be shown in crm-> Reports-> Registered
    @Query(value = "SELECT * FROM inquiry WHERE inquiryStatus_id=3",nativeQuery = true)
    List<Inquiry> findRegisteredInquiry();

    //display all the Dropped Inquiries
    //This data will be shown in crm-> Reports-> Dropped
    @Query(value = "SELECT * FROM inquiry WHERE inquiryStatus_id=4",nativeQuery = true)
    List<Inquiry> findDroppedInquiry();

    //display all the New Inquiries
    //This data will be shown in crm-> Dashboard-> inquiry pool
    @Query(value = "SELECT * FROM inquiry WHERE inquiry.inquirystatus_id =1;",nativeQuery = true)
    List<Inquiry> findNewInquiry();

    //display all the New Inquiries
    //This data will be shown in crm-> Dashboard-> inquiry pool
    @Query(value = "SELECT * FROM inquiry WHERE inquiry.inquirystatus_id =2;",nativeQuery = true)
    List<Inquiry> findProcessingInquiry();

    //Display all the inquiries with the latest follow-up information
    //This data will be shown in crm-> Inquiries
    @Query(value="SELECT DISTINCT i.id, i.source_id, i.course_id, i.firstname, i.lastname, i.primarymobilenumber, i.secondarymobilenumber, i.email, i.idtype, i.idvalue, i.contacttime, i.description,i.addedby,i.timestamp, i.inquirystatus_id, f.type, f.feeling, f.confirmed, f.content, f.nextfollowup AS followuptime FROM inquiry i LEFT JOIN followup f ON i.id = f.inquiry_id\n" +
            "WHERE f.followuptime = (SELECT MAX(followuptime) FROM followup WHERE followup.inquiry_id = i.id) ORDER BY i.id;",nativeQuery = true)
    List<Map<String,Object>> test();

    //Display all the inquires with max follow-up data
    //This data will be shown in crm-> Dashboard-> schedule pool
    @Query(value = "SELECT * FROM steam.inquiry JOIN ( SELECT * FROM steam.followup WHERE DATE(nextfollowup) = CURDATE() ORDER BY id DESC LIMIT 1) AS followup ON inquiry.id = followup.inquiry_id;",nativeQuery = true)
    List<Map<String,Object>> test2();

    //Display all the inquires with max follow-up data
    //This data will be shown in crm-> Dashboard-> schedule pool
    @Query(value = "SELECT i from Inquiry i where date(i.nextFollowUpDateTime)=curdate() and i.inquiryStatusId.id=2")
    List<Inquiry> getInquiriesWithFollowUpsToday();

    //Get the next inquiry number form the database
    //This data will be used in InquiryController
    @Query(value = "SELECT LPAD(MAX(inq.inquirynumber) + 1, 6, 0) AS inquirynumber FROM inquiry AS inq;",nativeQuery = true)
    String getNextInquiryNumber();

    //get count of the new inquiry
    //this data will be used in dashboard IMS
    @Query(value = "SELECT count(*) FROM inquiry where   inquirystatus_id =1;",nativeQuery = true)
    String getNewInquiryCount();

    @Query(value = "select i from Inquiry i where date(i.timeStamp)>=?1 and date(i.timeStamp)<=?2 and i.inquiryStatusId.name=?3 and i.addedBy=?4")
    List<Inquiry> getInquiryByDateRangeAndStatus(LocalDate startDate, LocalDate endDate, String status, String addedBy);

    @Query(value = "select distinct addedby from inquiry where date(timestamp)>=?1 and date(timestamp)<=?2",nativeQuery = true)
    List<String> getCounsellorsByDates(String startDate, String endDate);

    @Query(value = "Select * from inquiry where date(timestamp)>=?1 and date(timestamp)<=?2 and course_id=?3",nativeQuery = true)
    List<Inquiry> getInquiriesByDateRangeAndCourse(String startDate, String endDate, Integer courseId);

    @Query(value = "Select * from inquiry where date(timestamp)>=?1 and date(timestamp)<=?2 and source_id=?3",nativeQuery = true)
    List<Inquiry> getInquiriesByDateRangeAndSource(String startDate, String endDate, Integer sourceID);

    @Query(value = "Select * from inquiry where date(registereddatetime)>=?1 and date(registereddatetime)<=?2 and inquirystatus_id=5 and addedby =?3",nativeQuery = true)
    List<Inquiry> getRegisteredInquiriesThisMonth(String startDate, String endDate,String name);

    @Query("SELECT i from Inquiry i where i.courseId.id=?1 and i.idValue=?2")
    Inquiry getInquiryByCourseAndNiC(Integer courseID,String nic);
}

