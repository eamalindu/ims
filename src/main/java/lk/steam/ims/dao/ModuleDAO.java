package lk.steam.ims.dao;

import lk.steam.ims.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleDAO extends JpaRepository<Module,Integer> {
}
