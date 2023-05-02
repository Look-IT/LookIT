package lookIT.lookITspring.controller;
import java.util.ArrayList;
import java.util.List;
import lookIT.lookITspring.dto.AllLandmarkDto;
import lookIT.lookITspring.repository.LandmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/main")
@RestController
public class LandmarkController {

  @Autowired
  private LandmarkRepository landmarkRepository;

  //모든 랜드마크의 landmarkID, landLatitude, landLongitude 반환
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

  //아이디 값으로 반환
//  @GetMapping("/landmarks/{landmarkID}")
//  public ResponseEntity<Landmark> getLandmarkById(@PathVariable Long landmarkID) {
//    Optional<Landmark> landmark = landmarkRepository.findById(landmarkID);
//    if (landmark.isPresent()) {
//      return ResponseEntity.ok(landmark.get());
//    } else {
//      return ResponseEntity.notFound().build();
//    }
//  }


// 전부 반환
//  @GetMapping("/landmarks")
//  public List<Landmark> getAllLandmarks(){
//    return landmarkRepository.findAll();
//  }

  //지정한 이름으로 반환
//  @GetMapping("/landmarks")
//  public ResponseEntity<Landmark> findByName(@RequestParam String name) {
//    Optional<Landmark> landmark = landmarkRepository.findByName(name);
//    if (landmark.isPresent()) {
//      return ResponseEntity.ok(landmark.get());
//    } else {
//      return ResponseEntity.notFound().build();
//    }
//  }


}
