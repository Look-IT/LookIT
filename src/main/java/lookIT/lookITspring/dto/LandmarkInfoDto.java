package lookIT.lookITspring.dto;

public class LandmarkInfoDto {
  private String name;
  private String landInfo;
  private String framePath;

  public LandmarkInfoDto(String name, String landInfo, String framePath) {
    this.name = name;
    this.landInfo = landInfo;
    this.framePath = framePath;
  }

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

