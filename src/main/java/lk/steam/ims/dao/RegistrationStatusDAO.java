package lk.steam.ims.dao;

import lk.steam.ims.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationStatusDAO extends JpaRepository<RegistrationStatus, Integer> {
}
