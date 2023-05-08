package lookIT.lookITspring.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Memory")
public class Memory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memoryId")
    private Integer memoryId;

    @Column(name = "createAt", nullable = false, updatable = false,
            insertable = false, columnDefinition = "datetime DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "userId", nullable = false)
    private Integer userId;

    // constructors, getters, and setters
    public Memory() {
    }

    public Memory(Integer userId) {
        this.userId = userId;
    }

    public Integer getMemoryId() {
        return memoryId;
    }

    public void setMemoryId(Integer memoryId) {
        this.memoryId = memoryId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}

