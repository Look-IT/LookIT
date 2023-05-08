package lookIT.lookITspring.dto;

public class LandmarkInfoDto {
  private String landmarkName;
  private String landInfo;
  private String frameUrl;

  public LandmarkInfoDto(String landmarkName, String landInfo, String frameUrl) {
    this.landmarkName = landmarkName;
    this.landInfo = landInfo;
    this.frameUrl = frameUrl;
  }

  public String getLandmarkName() {
    return landmarkName;
  }

  public String getLandInfo() {
    return landInfo;
  }

  public String getFrameUrl() {
    return frameUrl;
  }
}

