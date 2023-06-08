package lookIT.lookITspring.service;


import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import com.amazonaws.services.s3.AmazonS3;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.LinePath;
import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.entity.MemoryPhoto;
import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.repository.LinePathRepository;
import lookIT.lookITspring.repository.MemoryPhotoRepository;
import lookIT.lookITspring.repository.MemoryRepository;
import lookIT.lookITspring.repository.MemorySpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    private final LinePathRepository linePathRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Autowired
    private AmazonS3 s3Client;

    public boolean createNewMemorySpot(Double spotLatitude, Double spotLongitude, Long memoryId, String imageUrl, String key) {
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
                    .memoryPhotoKey(key)
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
            List<Long> spotIds = new ArrayList<>();

            for (MemorySpot memorySpot : memorySpots) {
                Long memorySpotId = memorySpot.getSpotId();
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
                    spot.put("spotIDs", spotIds);
                    result.add(spot);

                    spot = new HashMap<>();
                    spotMemoryPhotos = new ArrayList<String>();
                    spotIds = new ArrayList<Long>();

                    spot.put("spotLongitude", currentLongitude);
                    spot.put("spotLatitude", currentLatitude);

                    previousLongitude.set(currentLongitude);
                    previousLatitude.set(currentLatitude);
                }
                spotIds.add(memorySpotId);
                System.out.println(spot);
                if (memoryPhotoOptional.isPresent()) {
                    spotMemoryPhotos.add(memoryPhotoOptional.get().getMemoryPhoto());
                }
            }
            if (!spot.isEmpty()){
                spot.put("memoryPhotos", spotMemoryPhotos);
                spot.put("spotIDs", spotIds);
                result.add(spot);
            }

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public List<LinePath> showAllLinePath(Long memoryId){
        Memory memory = memoryRepository.findById(memoryId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid memoryId"));

        return linePathRepository.findByMemory(memory);
    }

    private void deletePhotoFromS3(String key){
        try{
            boolean isS3Object = s3Client.doesObjectExist(bucket, key);
            if (isS3Object){
                s3Client.deleteObject(bucket,key);
            }else{
                throw new Exception("S3 object does not exist for the given key.");
            }
        }catch(Exception e){
            throw new RuntimeException("Failed - Delete S3 file",e);
        }
    }

    private void deleteSpotPhoto(String photoUrl){
        MemoryPhoto memoryPhoto = memoryPhotoRepository.findByMemoryPhoto(photoUrl);

        if (memoryPhoto != null) {
            deletePhotoFromS3(memoryPhoto.getMemoryPhotoKey());
            memoryPhotoRepository.delete(memoryPhoto);
        } else {
            throw new IllegalArgumentException("Memory photo not found.");
        }
    }

    public Boolean deletePhoto(String photoUrl) {
        try{
            int tIndex = photoUrl.indexOf('T');
            String timePart = photoUrl.substring(tIndex + 1);
            String encodedTimePart = URLEncoder.encode(timePart, StandardCharsets.UTF_8);
            String encodedPhotoUrl = photoUrl.substring(0, tIndex + 1) + encodedTimePart;
            deleteSpotPhoto(encodedPhotoUrl);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional
    public Boolean deleteSpot(Double spotLatitude, Double spotLongitude) {
        List<MemorySpot> memorySpots = memorySpotRepository.findBySpotLatitudeAndSpotLongitude(spotLatitude, spotLongitude);
        if (!memorySpots.isEmpty()) {
            for (MemorySpot memorySpot : memorySpots) {
                Long spotId = memorySpot.getSpotId();
                MemoryPhoto memoryPhoto = memoryPhotoRepository.findByMemorySpotSpotId(spotId);
                System.out.println(spotId);
                if (memoryPhoto != null){
                    try{
                        deleteSpotPhoto(memoryPhoto.getMemoryPhoto());
                    }catch (Exception e){
                        e.printStackTrace();
                        throw e;
                    }
                }else{
                    System.out.println("No memory Photo.");
                }
                memorySpotRepository.deleteById(spotId);
            }
            return true;
        }else {
            throw new IllegalArgumentException("Memory spot not found.");
        }
    }
}