package lookIT.lookITspring.dto;

public class AllLandmarkDto {
  private Long landmarkID;
  private Double landLatitude;
  private Double landLongitude;

  public AllLandmarkDto(Long landmarkID, Double landLatitude, Double landLongitude) {
    this.landmarkID = landmarkID;
    this.landLatitude = landLatitude;
    this.landLongitude = landLongitude;
  }

  public Long getLandmarkID() {
    return landmarkID;
  }

  public void setLandmarkID(Long landmarkID) {
    this.landmarkID = landmarkID;
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

