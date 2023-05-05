package lookIT.lookITspring.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "memory")
public class Memory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memoryID")
    private Integer memoryId;

    @Column(name = "createAt", nullable = false, updatable = false,
            insertable = false, columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "userID", nullable = false)
    private Integer userId;

}

