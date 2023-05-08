package lookIT.lookITspring.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Landmark {
  @Id
  private Long landmarkId;

  private String name;

//  @Column(name = "land_latitude")
  private Double landLatitude;

//  @Column(name = "land_longitude")
  private Double landLongitude;

//  @Column(name = "land_info")
  private String landInfo;

//  @Column(name = "frame_path")
  private String framePath;

  public String getName() {
    return name;
  }

  public String getLandInfo() {
    return landInfo;
  }

  public String getFramePath() {
    return framePath;
  }
}
