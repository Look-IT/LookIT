package lookIT.lookITspring.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.*;
import lookIT.lookITspring.repository.CollectionsRepository;
import lookIT.lookITspring.repository.LandmarkRepository;
import lookIT.lookITspring.repository.PhotoTagsRepository;
import lookIT.lookITspring.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Long savePhoto4Cut(Long landmarkId, Long userId, String imageUrl) {
        Landmark landmark = landmarkRepository.findById(landmarkId)
                .orElseThrow(() -> new IllegalArgumentException("landmark not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Collections collection = Collections.builder()
                .createAt(LocalDateTime.now())
                .user(user)
                .landmark(landmark)
                .photo4Cut(imageUrl)
                .build();

        collectionsRepository.save(collection);
        return collection.getPhoto4CutId();
    }

    public List<Collections> getCollectionsByUserId(Long userId) {
        List<Collections> collections = collectionsRepository.findAllByUserIdOrderByCreateAtDesc(userId);

        List<Long> photo4CutIds = collections.stream()
                .map(Collections::getPhoto4CutId)
                .collect(Collectors.toList());

        for (Collections collection : collections) {
            List<PhotoTags> matchingTags = photoTagsRepository.findByCollectionsPhoto4CutId(collection.getPhoto4CutId());
            collection.setPhotoTags(matchingTags);
        }

        return collections;
    }


    /*
public List<CollectionsWithPhotoTags> getCollectionsByUserId(Long userId) {
    List<Collections> collections = collectionsRepository.findAllByUserIdOrderByCreateAtDesc(userId);

    List<Long> photo4CutIds = collections.stream()
            .map(Collections::getPhoto4CutId)
            .collect(Collectors.toList());

    List<PhotoTags> photoTags = photoTagsRepository.findByCollectionsPhoto4CutId(photo4CutIds);

    Map<Long, List<PhotoTags>> photoTagsMap = new HashMap<>();
    for (PhotoTags photoTag : photoTags) {
        Long photo4CutId = photoTag.getCollections().getPhoto4CutId();
        List<PhotoTags> tagsList = photoTagsMap.getOrDefault(photo4CutId, new ArrayList<>());
        tagsList.add(photoTag);
        photoTagsMap.put(photo4CutId, tagsList);
    }

    List<CollectionsWithPhotoTags> collectionsWithPhotoTagsList = new ArrayList<>();
    for (Collections collection : collections) {
        Long photo4CutId = collection.getPhoto4CutId();
        List<PhotoTags> matchingTags = photoTagsMap.getOrDefault(photo4CutId, Collections.emptyList());

        CollectionsWithPhotoTags collectionWithPhotoTags = new CollectionsWithPhotoTags(collection);
        collectionWithPhotoTags.setPhotoTags(matchingTags);

        collectionsWithPhotoTagsList.add(collectionWithPhotoTags);
    }

    return collectionsWithPhotoTagsList;
}
*/



    public List<Collections> getCollectionsByTagId(String tagId) {

        List<PhotoTags> photoTags = photoTagsRepository.findByTagId(tagId);
        List<Long> photo4CutIds = photoTags.stream()
                .map(PhotoTags::getCollections)
                .map(Collections::getPhoto4CutId)
                .collect(Collectors.toList());
        return collectionsRepository.findByPhoto4CutIdInOrderByCreateAtDesc(photo4CutIds);
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

