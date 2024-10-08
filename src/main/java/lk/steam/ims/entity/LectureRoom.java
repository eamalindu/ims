package lk.steam.ims.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lectureroom")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LectureRoom {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String code;
    private String floor;
    private String room;


}
