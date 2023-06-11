package lookIT.lookITspring.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Landmark")
public class Landmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long landmarkId;

    @Column(name = "landmarkName", nullable = false)
    private String landmarkName;

    @Column(name = "landLatitude", nullable = false)
    private Double landLatitude;

    @Column(name = "landLongitude", nullable = false)
    private Double landLongitude;

    @Column(name = "landInfo")
    private String landInfo;

    @Column(name = "landmarkAddress")
    private String landmarkAddress;

    @Column(name = "frameUrl")
    private String frameUrl;

    public void setId(long landmarkId) {
        this.landmarkId = landmarkId;
    }

    public void setFrameUrl(String frameUrl) {
        this.frameUrl = frameUrl;
    }
}
