package lk.steam.ims.dao;

import lk.steam.ims.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseDAO extends JpaRepository<Course,Integer> {

}
