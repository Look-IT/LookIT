package lookIT.lookITspring.service;

import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.Landmark;
import lookIT.lookITspring.repository.LandmarkRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class Photo4CutService {
    private final LandmarkRepository landmarkRepository;

    public String getPhotoFrame(long landmarkId) throws Exception {
        try{
            Optional<Landmark> landmark = landmarkRepository.findById(landmarkId);
            System.out.println(landmark);
            return landmark.get().getFrameUrl();
        }catch (Exception e) {
            throw new Exception("No frameUrl found for the given landmarkId.");
        }
    }
}
