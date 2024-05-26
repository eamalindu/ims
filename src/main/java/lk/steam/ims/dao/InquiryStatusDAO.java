package lk.steam.ims.dao;

import lk.steam.ims.entity.InquiryStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryStatusDAO extends JpaRepository<InquiryStatus,Integer> {
}
