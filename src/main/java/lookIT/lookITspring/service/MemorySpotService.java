package lookIT.lookITspring.service;


import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.entity.MemorySpotId;
import lookIT.lookITspring.repository.MemorySpotRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemorySpotService {
    private final MemorySpotRepository memorySpotRepository;

    public boolean createNewMemorySpot(Float spotLatitude, Float spotLongitude, Integer memoryID, String imageUrl) {
        try {
            MemorySpotId id = MemorySpotId.builder().memoryID(memoryID).spotLatitude(spotLatitude).spotLongitude(spotLongitude).build();
            MemorySpot memorySpot = new MemorySpot(id, imageUrl);
            memorySpotRepository.save(memorySpot);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

}
