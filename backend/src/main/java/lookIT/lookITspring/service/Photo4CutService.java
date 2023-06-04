package lookIT.lookITspring.service;

import java.util.HashMap;
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

        return collections;
    }


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

    public boolean collectionFriendTagDelete(Long photo4CutId){
        photoTagsRepository.deleteByCollectionsPhoto4CutId(photo4CutId);
        return true;
    }

    public List<Map<String, String>> getTaggedFriendListByPhoto4CutIdId(Long photo4CutId) {
        Collections collections = collectionsRepository.findById(photo4CutId).get();
        List<PhotoTags> photoTags = photoTagsRepository.findByCollectionsPhoto4CutId(photo4CutId);
        List<Map<String, String>> friendList= new ArrayList<>();

        for(PhotoTags friend : photoTags){
            String tagId = friend.getTagId();
            User user = userRepository.findByTagId(tagId).get();
            Map<String, String> friendMap = new HashMap<>();
            friendMap.put("nickName", user.getNickName());
            friendMap.put("tagId", user.getTagId());
            friendList.add(friendMap);
        }
        return friendList;
    }

    public boolean Photo4CutDelete(Long photo4CutId){
        collectionFriendTagDelete(photo4CutId); //추억네컷 친구 태그 삭제
        /**
        * 
        * 추억네컷 사진 삭제
        *
        */
        return true;
    }
}

