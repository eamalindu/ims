package lk.steam.ims.dao;

import lk.steam.ims.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeStatusDAO extends JpaRepository<EmployeeStatus,Integer> {
}
