package lookIT.lookITspring.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.AllLandmarkDto;
import lookIT.lookITspring.dto.LandmarkInfoDto;
import lookIT.lookITspring.service.LandmarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/main")
@RestController
public class LandmarkController {

    private final LandmarkService landmarkService;

    @GetMapping("/landmarks")
    public List<AllLandmarkDto> getAllLandmarks() {
        return landmarkService.allLandmarkInfo();
    }

    @GetMapping
    public ResponseEntity<LandmarkInfoDto> getLandmarkById(@RequestParam Long landmarkId) {
        return landmarkService.landmarkInfoWithLandmarkId(landmarkId);
    }
}
