package lookIT.lookITspring.service;

import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.repository.MemoryRepository;
import lookIT.lookITspring.repository.MemorySpotRepository;

import org.junit.jupiter.api.Disabled;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.testng.AssertJUnit.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class MemorySpotServiceTest {

    @Mock
    private MemorySpotRepository memorySpotRepository;

    @Mock
    private MemoryRepository memoryRepository;

    @InjectMocks
    private MemorySpotService memorySpotService;
/*

    @Test
    public void testCreateNewMemorySpot() {
        MockitoAnnotations.openMocks(this);

        Double spotLatitude = 37.12345;
        Double spotLongitude = 127.12345;
        Long memoryId = 1L;
        String imageUrl = "http://example.com/image.jpg";

        Memory memory = Memory.builder().memoryId(memoryId).build();
        when(memoryRepository.findById(memoryId)).thenReturn(Optional.of(memory));

        MemorySpotId id = MemorySpotId.builder().memory(memory).spotLatitude(spotLatitude).spotLongitude(spotLongitude).build();
        MemorySpot memorySpot = new MemorySpot(id, imageUrl);
        when(memorySpotRepository.save(memorySpot)).thenReturn(memorySpot);

        boolean result = memorySpotService.createNewMemorySpot(spotLatitude, spotLongitude, memoryId, imageUrl);

        assertTrue(result);
    }

    @Test
    public void testShowAllMemorySpotPhotos() throws Exception {
        MockitoAnnotations.openMocks(this);

        Long memoryID = 1L;
        List<MemorySpot> memorySpots = new ArrayList<>();
        Memory memory = Memory.builder().memoryId(memoryID).build();
        MemorySpotId id1 = MemorySpotId.builder().memory(memory).spotLatitude(37.564213).spotLongitude(127.001698).build();
        MemorySpot memorySpot1 = new MemorySpot(id1, "http://example.com/image1.jpg");
        MemorySpotId id2 = MemorySpotId.builder().memory(memory).spotLatitude(37.565513).spotLongitude(127.002398).build();
        MemorySpot memorySpot2 = new MemorySpot(id2, "http://example.com/image2.jpg");
        memorySpots.add(memorySpot1);
        memorySpots.add(memorySpot2);
        when(memoryRepository.findById(memoryID)).thenReturn(Optional.of(memory));
        when(memorySpotRepository.findAllById_Memory(memory)).thenReturn(memorySpots);

        List<Map<String, Object>> result = memorySpotService.showAllMemorySpotPhotos(memoryID);

        assertEquals(2, result.size());
        assertEquals("http://example.com/image1.jpg", result.get(0).get("memoryPhoto"));
        assertEquals(127.001698, result.get(0).get("spotLongitude"));
        assertEquals(37.564213, result.get(0).get("spotLatitude"));
        assertEquals("http://example.com/image2.jpg", result.get(1).get("memoryPhoto"));
        assertEquals(127.002398, result.get(1).get("spotLongitude"));
        assertEquals(37.565513, result.get(1).get("spotLatitude"));
    }

 */
}
