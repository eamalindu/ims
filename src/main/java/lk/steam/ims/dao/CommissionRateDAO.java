package lk.steam.ims.dao;

import lk.steam.ims.entity.CommissionRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommissionRateDAO extends JpaRepository<CommissionRate, Integer> {

    @Query(value = "SELECT cr from CommissionRate cr where cr.courseID.id=?1")
    CommissionRate getCommissionRateByCourseID(int courseID);
}
