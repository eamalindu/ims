package lk.steam.ims.dao;

import lk.steam.ims.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ModuleDAO extends JpaRepository<Module,Integer> {

    @Query("select m from Module m where m.id not in (select p.moduleID.id from Privilege p where p.roleID.id=?1)")
    List<Module> getModuleByRoles(Integer roleID);
}
