package lk.steam.ims.dao;

import lk.steam.system.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {
}
