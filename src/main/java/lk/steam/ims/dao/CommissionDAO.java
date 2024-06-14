package lk.steam.ims.dao;

import lk.steam.ims.entity.Commission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommissionDAO extends JpaRepository<Commission, Integer> {

    @Query("select c from Commission c where c.registrationID.id=?1")
    Commission getCommissionByRegistrationID(Integer registrationID);

    @Query("select c from Commission c where date(c.timestamp)>=?1 and date(c.timestamp)<=?2 and c.paidTo=?3")
    List<Commission> getCommissionByDateRangeAndPaidTo(String startDate, String endDate, String paidTo);
}
