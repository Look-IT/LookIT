package lookIT.lookITspring.dto;

public class LandmarkInfoDto {
  private String landmarkName;
  private String landInfo;
  private String framePath;

  public LandmarkInfoDto(String landmarkName, String landInfo, String framePath) {
    this.landmarkName = landmarkName;
    this.landInfo = landInfo;
    this.framePath = framePath;
  }

  public String getLandmarkName() {
    return landmarkName;
  }

  public String getLandInfo() {
    return landInfo;
  }

  public String getFramePath() {
    return framePath;
  }
}

