package lookIT.lookITspring.entity;

import javax.persistence.*;
@Entity
@Table(name = "memoryspot")
public class MemorySpot {

    @EmbeddedId
    private MemorySpotId id;

    @Column(name = "memoryPhoto", length = 255)
    private String memoryPhoto;

    public MemorySpot() {}
    public MemorySpot(MemorySpotId id, String memoryPhoto) {
        this.id = id;
        this.memoryPhoto = memoryPhoto;
    }


    public MemorySpotId getId() {
        return id;
    }

    public void setId(MemorySpotId id) {
        this.id = id;
    }

    public String getMemoryPhoto() {
        return memoryPhoto;
    }

    public void setMemoryPhoto(String memoryPhoto) {
        this.memoryPhoto = memoryPhoto;
    }

}
