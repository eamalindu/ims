package lk.steam.ims.dao;

import lk.steam.ims.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {
    @Query(value = "select * from employee where id not in (select employee_id from user where employee_id is not null)",nativeQuery = true)
    List<Employee> getEmployeesWithoutUserAccount();

    @Query(value = "SELECT e from Employee e where e.designationID.id=2")
    List<Employee> getActiveCounsellors();
}
