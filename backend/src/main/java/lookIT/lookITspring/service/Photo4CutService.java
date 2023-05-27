package lookIT.lookITspring.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.*;
import lookIT.lookITspring.repository.CollectionsRepository;
import lookIT.lookITspring.repository.LandmarkRepository;
import lookIT.lookITspring.repository.PhotoTagsRepository;
import lookIT.lookITspring.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
public class Photo4CutService {
    private final LandmarkRepository landmarkRepository;
    private final CollectionsRepository collectionsRepository;
    private final UserRepository userRepository;
    private final PhotoTagsRepository photoTagsRepository;

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
        return collectionsRepository.findAllByUserIdOrderByCreateAtDesc(userId);
    }

    public List<Collections> getCollectionsByTagId(String tagId) {
        return collectionsRepository.findAllByUserTagIdOrderByCreateAtDesc(tagId);
    }

    public String collectionFriendTag(String[] friendsList, Long photo4CutId){
        Collections collection = collectionsRepository.findById(photo4CutId).orElseThrow(() -> new IllegalArgumentException("Invalid photo4CutId"));

        if(friendsList.length != 0){
            for (String friend : friendsList){
                PhotoTags photoTags = PhotoTags.builder()
                    .tagId(friend)
                    .collections(collection)
                    .build();
                photoTagsRepository.save(photoTags);
            }
            return "Friends tagged successfully to photo4Cut";
        } else {
            return "No friends to tag to photo4Cut";
        }
    }
}

