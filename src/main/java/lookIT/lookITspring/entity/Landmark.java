package lookIT.lookITspring.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Landmark {
  @Id
  private Long landmarkId;

  private String landmarkName;

  private Double landLatitude;

  private Double landLongitude;

  private String landInfo;

  private String frameUrl;

  public String getLandmarkName() {
    return landmarkName;
  }

  public String getLandInfo() {
    return landInfo;
  }

  public String getFrameUrl() { return frameUrl; }
}
