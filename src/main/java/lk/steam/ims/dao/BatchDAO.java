package lk.steam.ims.dao;

import lk.steam.ims.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BatchDAO extends JpaRepository<Batch,Integer> {

    @Query(value = "Select b from Batch b where (b.batchStatusID.id=1 or b.batchStatusID.id=2) and b.lastRegDate >= curdate()")
    List<Batch> getActiveBatches();

    @Query(value = "SELECT b FROM Batch b WHERE b.courseID.id =?1 and (b.batchStatusID.id=1 or b.batchStatusID.id=2) and b.lastRegDate >= curdate()")
    List<Batch> getActiveBatchesFromCourseID(Integer courseID);
}
