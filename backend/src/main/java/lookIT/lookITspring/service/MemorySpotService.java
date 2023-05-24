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
import java.util.concurrent.atomic.AtomicReference;


@RequiredArgsConstructor
public class MemorySpotService {
    private final MemorySpotRepository memorySpotRepository;
    private final MemoryRepository memoryRepository;
    private final MemoryPhotoRepository memoryPhotoRepository;

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

    public List<Map<String, Object>> showAllMemorySpotPhotos(Long memoryId) throws Exception {
        try {
            Optional<Memory> memory = memoryRepository.findById(memoryId);
            List<MemorySpot> memorySpots = memorySpotRepository.findAllByMemory(memory.get());
            if(memorySpots.isEmpty()) {
                return new ArrayList<>();
            }

            List<Map<String, Object>> result = new ArrayList<>();
            AtomicReference<Double> previousLongitude = new AtomicReference<>(null);
            AtomicReference<Double> previousLatitude = new AtomicReference<>(null);
            List<String> spotMemoryPhotos = new ArrayList<String>();
            Map<String, Object> spot = new HashMap<>();

            for (MemorySpot memorySpot : memorySpots) {

                Optional<MemoryPhoto> memoryPhotoOptional = Optional.ofNullable(memoryPhotoRepository.findByMemorySpotSpotId(memorySpot.getSpotId()));

                Double currentLongitude = memorySpot.getSpotLongitude();
                Double currentLatitude = memorySpot.getSpotLatitude();
                if (previousLongitude.get() == null || previousLatitude.get() == null) {
                    previousLongitude.set(currentLongitude);
                    previousLatitude.set(currentLatitude);
                    spot.put("spotLongitude", previousLongitude.get());
                    spot.put("spotLatitude", previousLatitude.get());
                } else if (!previousLongitude.get().equals(currentLongitude) || !previousLatitude.get().equals(currentLatitude)) {
                    spot.put("memoryPhotos", spotMemoryPhotos);
                    result.add(spot);

                    spot = new HashMap<>();
                    spotMemoryPhotos = new ArrayList<String>();

                    spot.put("spotLongitude", currentLongitude);
                    spot.put("spotLatitude", currentLatitude);


                    previousLongitude.set(currentLongitude);
                    previousLatitude.set(currentLatitude);
                }
                System.out.println(spot);
                if (memoryPhotoOptional.isPresent()) {
                    spotMemoryPhotos.add(memoryPhotoOptional.get().getMemoryPhoto());
                }

            }
            if (!spot.isEmpty()){
                spot.put("memoryPhotos", spotMemoryPhotos);
                result.add(spot);
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

}