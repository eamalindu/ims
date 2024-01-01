package lk.steam.ims.dao;

import lk.steam.ims.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {
}
