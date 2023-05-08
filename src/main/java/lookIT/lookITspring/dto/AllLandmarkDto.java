package lookIT.lookITspring.dto;

public class AllLandmarkDto {
  private Long landmarkId;
  private Double landLatitude;
  private Double landLongitude;

  public AllLandmarkDto(Long landmarkId, Double landLatitude, Double landLongitude) {
    this.landmarkId = landmarkId;
    this.landLatitude = landLatitude;
    this.landLongitude = landLongitude;
  }

  public Long getLandmarkId() {
    return landmarkId;
  }

  public void setLandmarkId(Long landmarkId) {
    this.landmarkId = landmarkId;
  }

  public Double getLandLatitude() {
    return landLatitude;
  }

  public void setLandLatitude(Double landLatitude) {
    this.landLatitude = landLatitude;
  }

  public Double getLandLongitude() {
    return landLongitude;
  }

  public void setLandLongitude(Double landLongitude) {
    this.landLongitude = landLongitude;
  }
}

