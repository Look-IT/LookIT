package lookIT.lookITspring.service;


import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.entity.MemoryPhoto;
import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.repository.MemoryPhotoRepository;
import lookIT.lookITspring.repository.MemoryRepository;
import lookIT.lookITspring.repository.MemorySpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RequiredArgsConstructor
public class MemorySpotService {
    private final MemorySpotRepository memorySpotRepository;
    private final MemoryRepository memoryRepository;
    private final MemoryPhotoRepository memoryPhotoRepository;
/*
    public boolean createNewMemorySpot(Double spotLatitude, Double spotLongitude, Long memoryId, String imageUrl)  {
        try {
            Optional<Memory> memoryOptional = memoryRepository.findById(memoryId);
            if (memoryOptional.isPresent()){
                Memory memory = memoryOptional.get();
                MemorySpot memorySpot = MemorySpot.builder()
                        .spotLatitude(spotLatitude)
                        .spotLongitude(spotLongitude)
                        .memory(memory)
                        .build();
                memorySpotRepository.save(memorySpot);
                return true;
            }
            else{
                throw new IllegalAccessException("Invalid memoryId: " + memoryId);
            }
        } catch (Exception e) {
            throw e;
        }
    }*/
    public boolean createNewMemorySpot(Double spotLatitude, Double spotLongitude, Long memoryId, String imageUrl) {
        Optional<Memory> memoryOptional = memoryRepository.findById(memoryId);
        if (memoryOptional.isPresent()) {
            Memory memory = memoryOptional.get();

            MemorySpot memorySpot = MemorySpot.builder()
                    .spotLatitude(spotLatitude)
                    .spotLongitude(spotLongitude)
                    .memory(memory)
                    .build();
            memorySpotRepository.save(memorySpot);

            MemoryPhoto memoryPhoto = MemoryPhoto.builder()
                    .memorySpot(memorySpot)
                    .memoryPhoto(imageUrl)
                    .build();
            memoryPhotoRepository.save(memoryPhoto);

            return true;
        } else {
            throw new IllegalArgumentException("Invalid memoryId: " + memoryId);
        }
    }
    /*
    public List<Map<String, Object>> showAllMemorySpotPhotos(Long memoryId) throws Exception {
        try {
            Optional<Memory> memory = memoryRepository.findById(memoryId);
            List<MemorySpot> memorySpots = memorySpotRepository.findAllById_Memory(memory.get());
            if(memorySpots.isEmpty()) {
                throw new Exception("No memory spot found for the given memory Id.");
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
    }*/

}