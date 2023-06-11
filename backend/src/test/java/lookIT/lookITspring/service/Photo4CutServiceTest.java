package lookIT.lookITspring.service;

import lookIT.lookITspring.entity.Collections;
import lookIT.lookITspring.entity.Landmark;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.CollectionsRepository;
import lookIT.lookITspring.repository.LandmarkRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class Photo4CutServiceTest {

    @Mock
    private LandmarkRepository landmarkRepository;

    @InjectMocks
    private Photo4CutService photo4CutService;

    @Mock
    private CollectionsRepository collectionsRepository;

    @Test
    public void testGetPhotoFrame() throws Exception {
        Long landmarkId = 1L;
        String expectedFrameUrl = "http://example.com/frame.jpg";
        Landmark landmark = Landmark.builder()
            .landmarkId(landmarkId)
            .landmarkName("Test Landmark")
            .landLatitude(0.0)
            .landLongitude(0.0)
            .landInfo("Test Landmark Info")
            .frameUrl(expectedFrameUrl)
            .build();
        when(landmarkRepository.findById(landmarkId)).thenReturn(Optional.of(landmark));

        String result = photo4CutService.getPhotoFrame(landmarkId);

        assertEquals(expectedFrameUrl, result);
    }

    @Test
    public void testGetPhotoFrameNoLandmarkFound() throws Exception {
        Long landmarkId = 1L;
        when(landmarkRepository.findById(landmarkId)).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> photo4CutService.getPhotoFrame(landmarkId));
    }

    @Test
    public void testGetPhotoFrameNoFrameUrl() throws Exception {
        Long landmarkId = 1L;
        Landmark landmark = Landmark.builder()
            .landmarkId(landmarkId)
            .landmarkName("Test Landmark")
            .landLatitude(0.0)
            .landLongitude(0.0)
            .landInfo("Test Landmark Info")
            .build();
        when(landmarkRepository.findById(landmarkId)).thenReturn(Optional.of(landmark));

        assertThrows(Exception.class, () -> photo4CutService.getPhotoFrame(landmarkId));
    }

    @Test
    public void getCollectionsByUserId() {
        Long userId = 1L;
        Long landmarkId = 1L;
        List<Collections> collectionsList = new ArrayList<>();
        User user = User.builder().userId(userId).build();
        Landmark landmark = Landmark.builder().landmarkId(landmarkId).build();
        LocalDateTime now = LocalDateTime.now();
        Collections collection1 = Collections.builder().photo4CutId(1L).user(user)
            .landmark(landmark).photo4Cut("test1").createAt(now).build();
        Collections collection2 = Collections.builder().photo4CutId(2L).user(user)
            .landmark(landmark).photo4Cut("test2").createAt(now.minusMinutes(10)).build();
        collectionsList.add(collection1);
        collectionsList.add(collection2);
        when(collectionsRepository.findAllByUserIdOrderByCreateAtDesc(userId)).thenReturn(
            collectionsList);

        List<Collections> result = photo4CutService.getCollectionsByUserId(userId);

        assertThat(result).isEqualTo(collectionsList);
        verify(collectionsRepository).findAllByUserIdOrderByCreateAtDesc(userId);
    }
}

