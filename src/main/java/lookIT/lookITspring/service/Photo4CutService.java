package lookIT.lookITspring.service;

import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.*;
import lookIT.lookITspring.repository.CollectionsRepository;
import lookIT.lookITspring.repository.LandmarkRepository;
import lookIT.lookITspring.repository.UserRepository;
import org.hibernate.Session;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class Photo4CutService {
    private final LandmarkRepository landmarkRepository;

    private final CollectionsRepository collectionsRepository;

    private final UserRepository userRepository;

    public String getPhotoFrame(long landmarkId) throws Exception {
        try {
            Optional<Landmark> landmark = landmarkRepository.findById(landmarkId);
            String frameUrl = landmark.orElseThrow(() -> new Exception("No landmark found for the given landmarkId."))
                    .getFrameUrl();
            if (frameUrl == null) {
                throw new Exception("No landmarkFrame for the given landmark.");
            }
            return frameUrl;
        } catch (Exception e) {
            throw new Exception("Failed to get photo frame for the given landmarkId.", e);
        }
    }

    public boolean savePhoto4Cut(Long landmarkId, Long userId, String imageUrl) {
        Landmark landmark = landmarkRepository.findById(landmarkId)
                .orElseThrow(() -> new IllegalArgumentException("landmark not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Collections collection = Collections.builder()
                .photo4CutId((long) (Math.random() * 1000))
                .createAt(LocalDateTime.now())
                .user(user)
                .landmark(landmark)
                .photo4Cut(imageUrl)
                .build();

        collectionsRepository.save(collection);
        return true;
    }
    public List<Collections> getCollectionsByUserId(Long userId) {
        System.out.println("test");
        return collectionsRepository.findAllByUserIdOrderByCreateAtDesc(userId);
    }

}

