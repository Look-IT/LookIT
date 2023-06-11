package lookIT.lookITspring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.AllLandmarkDto;
import lookIT.lookITspring.dto.LandmarkInfoDto;
import lookIT.lookITspring.entity.Landmark;
import lookIT.lookITspring.repository.LandmarkRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Transactional
public class LandmarkService {

    private final LandmarkRepository landmarkRepository;

    public List<AllLandmarkDto> allLandmarkInfo() {
        List<Object[]> landmarks = landmarkRepository.findAllLandmarks();
        List<AllLandmarkDto> result = new ArrayList<>();
        for (Object[] landmark : landmarks) {
            AllLandmarkDto alllandmarkDto = new AllLandmarkDto((Long) landmark[0],
                (Double) landmark[1], (Double) landmark[2]);
            result.add(alllandmarkDto);
        }
        return result;
    }

    public ResponseEntity<LandmarkInfoDto> landmarkInfoWithLandmarkId(
        @RequestParam Long landmarkId) {
        Optional<Landmark> landmark = landmarkRepository.findById(landmarkId);
        if (landmark.isPresent()) {
            LandmarkInfoDto landmarkInfo = new LandmarkInfoDto(
                landmark.get().getLandmarkName(),
                landmark.get().getLandInfo(),
                landmark.get().getFrameUrl(),
                landmark.get().getLandmarkAddress());
            return ResponseEntity.ok(landmarkInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
