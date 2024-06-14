package lk.steam.ims.dao;

import lk.steam.ims.entity.Commission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommissionDAO extends JpaRepository<Commission, Integer> {

    @Query("select c from Commission c where c.registrationID.id=?1")
    Commission getCommissionByRegistrationID(Integer registrationID);

    @Query(value = "select * from commission where date(timestamp)>=?1 and date(timestamp)<=?2 and paidto=?3",nativeQuery = true)
    List<Commission> getCommissionByDateRangeAndPaidTo(String startDate, String endDate, String paidTo);
}
