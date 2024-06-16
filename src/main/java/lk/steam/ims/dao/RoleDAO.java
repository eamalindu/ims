package lk.steam.ims.dao;


import lk.steam.ims.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleDAO extends JpaRepository<Role,Integer> {

    @Query("SELECT r from Role r where r.designation=?1")
    Role getRoleByName(String designation);
}
