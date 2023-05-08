package lookIT.lookITspring.service;


import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.entity.MemorySpotId;
import lookIT.lookITspring.repository.MemorySpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemorySpotService {
    private final MemorySpotRepository memorySpotRepository;

    public boolean createNewMemorySpot(Double spotLatitude, Double spotLongitude, Integer memoryID, String imageUrl) {
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

    public List<Map<String, Object>> showAllMemorySpotPhotos(Integer memoryID) throws Exception {
        try {
            List<MemorySpot> memorySpots = memorySpotRepository.findAllById_MemoryID(memoryID);
            if(memorySpots.isEmpty()) {
                throw new Exception("No memory spot found for the given memory ID.");
            }

            List<Map<String, Object>> result = new ArrayList<>();
            for (MemorySpot memorySpot : memorySpots) {
                Map<String, Object> spot = new HashMap<>();
                spot.put("memoryPhoto", memorySpot.getMemoryPhoto());
                spot.put("spotLongitude", memorySpot.getId().getSpotLongitude());
                spot.put("spotLatitude", memorySpot.getId().getSpotLatitude());
                result.add(spot);
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

}