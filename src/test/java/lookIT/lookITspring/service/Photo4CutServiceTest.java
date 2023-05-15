package lookIT.lookITspring.service;

import lookIT.lookITspring.entity.Landmark;
import lookIT.lookITspring.repository.LandmarkRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class Photo4CutServiceTest {

    @Mock
    private LandmarkRepository landmarkRepository;

    @InjectMocks
    private Photo4CutService photo4CutService;

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
}

