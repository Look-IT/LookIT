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
    private Float spotLatitude;

    @Column(name = "spotLongitude")
    private Float spotLongitude;

    @Column(name = "memoryID")
    private Integer memoryID;

    public MemorySpotId(Float spotLatitude, Float spotLongitude, Integer memoryID) {
        this.spotLatitude = spotLatitude;
        this.spotLongitude = spotLongitude;
        this.memoryID = memoryID;
    }

    public Float getSpotLatitude() {
        return spotLatitude;
    }

    public void setSpotLatitude(Float spotLatitude) {
        this.spotLatitude = spotLatitude;
    }

    public Float getSpotLongitude() {
        return spotLongitude;
    }

    public void setSpotLongitude(Float spotLongitude) {
        this.spotLongitude = spotLongitude;
    }
}
