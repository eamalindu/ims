package lk.steam.ims.dao;

import lk.steam.ims.entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeDAO extends JpaRepository<Privilege,Integer> {
}
