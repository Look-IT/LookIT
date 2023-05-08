package lookIT.lookITspring.service;

import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.entity.MemorySpotId;
import lookIT.lookITspring.repository.MemorySpotRepository;
import org.junit.jupiter.api.Assertions;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.testng.annotations.Test;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class MemorySpotServiceTest {
    @Mock
    private MemorySpotRepository memorySpotRepository;

    @InjectMocks
    private MemorySpotService memorySpotService;


    @Test
    public void testCreateNewMemorySpot() {
        MockitoAnnotations.openMocks(this);

        Double spotLatitude = 37.12345;
        Double spotLongitude = 127.12345;
        Integer memoryID = 1;
        String imageUrl = "http://example.com/image.jpg";

        boolean result = memorySpotService.createNewMemorySpot(spotLatitude, spotLongitude, memoryID, imageUrl);

        assertTrue(result);
    }



    @Test
    public void testShowAllMemorySpotPhotos() throws Exception {
        MockitoAnnotations.openMocks(this);

        Integer memoryID = 1;
        List<MemorySpot> memorySpots = new ArrayList<>();
        MemorySpotId id1 = new MemorySpotId(37.564213, 127.001698, memoryID);
        MemorySpot memorySpot1 = new MemorySpot(id1, "http://example.com/image1.jpg");
        MemorySpotId id2 = new MemorySpotId(37.565513, 127.002398, memoryID);
        MemorySpot memorySpot2 = new MemorySpot(id2, "http://example.com/image2.jpg");
        memorySpots.add(memorySpot1);
        memorySpots.add(memorySpot2);

        when(memorySpotRepository.findAllById_MemoryID(memoryID)).thenReturn(memorySpots);

        List<Map<String, Object>> result = memorySpotService.showAllMemorySpotPhotos(memoryID);

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("http://example.com/image1.jpg", result.get(0).get("memoryPhoto"));
        Assertions.assertEquals(127.001698, result.get(0).get("spotLongitude"));
        Assertions.assertEquals(37.564213, result.get(0).get("spotLatitude"));
        Assertions.assertEquals("http://example.com/image2.jpg", result.get(1).get("memoryPhoto"));
        Assertions.assertEquals(127.002398, result.get(1).get("spotLongitude"));
        Assertions.assertEquals(37.565513, result.get(1).get("spotLatitude"));
    }


}
