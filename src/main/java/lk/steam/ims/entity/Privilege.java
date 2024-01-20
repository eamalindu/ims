package lk.steam.ims.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "privilege")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Privilege {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "select")
    @NotNull
    private Boolean select;

    @Column(name = "insert")
    @NotNull
    private Boolean insert;

    @Column(name = "update")
    @NotNull
    private Boolean update;

    @Column(name = "delete")
    @NotNull
    private Boolean delete;

    //foreign keys
    @ManyToOne
    @JoinColumn(name = "role_id",referencedColumnName = "id")
    private Role roleID;

    @ManyToOne
    @JoinColumn(name = "module_id",referencedColumnName = "id")
    private Boolean moduleID;

}
