package lk.steam.ims.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "batch")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Batch {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "batchcode",unique = true)
    @NotNull
    private String batchCode;

    @Column(name = "commencedate")
    @NotNull
    private LocalDate commenceDate;

    @Column(name = "enddate")
    @NotNull
    private LocalDate endDate;

    @Column(name = "seatcount")
    @NotNull
    private Integer seatCount;

    @Column(name = "starttime")
    @NotNull
    private LocalTime startTime;

    @Column(name = "endtime")
    @NotNull
    private LocalTime endTime;

    @Column(name = "createdby")
    @NotNull
    private String createdBy;

    @Column(name = "lecturer")
    @NotNull
    private String lecturer;

    @Column(name = "status")
    @NotNull
    private Integer status;

    @Column(name = "timestamp")
    @NotNull
    private LocalDateTime timestamp;

    @Column(name = "location")
    @NotNull
    private String location;

    @Column(name = "description")
    @NotNull
    private String description;

    @ManyToOne
    @JoinColumn(name = "course_id",referencedColumnName = "id")
    private Course course_id;
}
