package lookIT.lookITspring.entity;


import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@Builder
@Embeddable
@NoArgsConstructor
public class MemorySpotId implements Serializable {

    @Column(name = "spotLatitude")
    private Double spotLatitude;

    @Column(name = "spotLongitude")
    private Double spotLongitude;

    @Column(name = "memoryID")
    private Integer memoryID;

    public MemorySpotId(Double spotLatitude, Double spotLongitude, Integer memoryID) {
        this.spotLatitude = spotLatitude;
        this.spotLongitude = spotLongitude;
        this.memoryID = memoryID;
    }

    public Double getSpotLatitude() {
        return spotLatitude;
    }

    public void setSpotLatitude(Double spotLatitude) {
        this.spotLatitude = spotLatitude;
    }

    public Double getSpotLongitude() {
        return spotLongitude;
    }

    public void setSpotLongitude(Double spotLongitude) {
        this.spotLongitude = spotLongitude;
    }
}
