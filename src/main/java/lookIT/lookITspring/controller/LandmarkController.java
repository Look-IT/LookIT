package lookIT.lookITspring.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lookIT.lookITspring.dto.AllLandmarkDto;
import lookIT.lookITspring.dto.LandmarkInfoDto;
import lookIT.lookITspring.entity.Landmark;
import lookIT.lookITspring.repository.LandmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/main")
@RestController
public class LandmarkController {

  @Autowired
  private LandmarkRepository landmarkRepository;

  //모든 랜드마크의 landmarkId, landLatitude, landLongitude 반환
  @GetMapping("/landmarks")
  public List<AllLandmarkDto> getAllLandmarks() {
    List<Object[]> landmarks = landmarkRepository.findAllLandmarks();
    List<AllLandmarkDto> result = new ArrayList<>();
    for (Object[] landmark : landmarks) {
      AllLandmarkDto alllandmarkDto = new AllLandmarkDto((Long) landmark[0], (Double) landmark[1], (Double) landmark[2]);
      result.add(alllandmarkDto);
    }
    return result;
  }

  //주어진 landmarkID의 정보 반환
  @GetMapping
  public ResponseEntity<LandmarkInfoDto> getLandmarkById(@RequestParam Long landmarkID) {
    Optional<Landmark> landmark = landmarkRepository.findById(landmarkID);
    if (landmark.isPresent()) {
      LandmarkInfoDto landmarkInfo = new LandmarkInfoDto(
          landmark.get().getLandmarkName(),
          landmark.get().getLandInfo(),
          landmark.get().getFrameUrl());
      return ResponseEntity.ok(landmarkInfo);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

}
