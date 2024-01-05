package lk.steam.ims.dao;

import lk.steam.ims.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeDAO extends JpaRepository<Employee,Integer> {
    @Query(value = "select e from Employee e where e.id not in (select u.employeeID from User u where u.employeeID is not null)")
    List<Employee> getEmployeesWithoutUserAccount();
}
