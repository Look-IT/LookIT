package lookIT.lookITspring.repository;


import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.entity.MemorySpotId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface MemorySpotRepository extends JpaRepository<MemorySpot, MemorySpotId> {
    //MemorySpot findBySpotLatitudeAndSpotLongitudeAndMemoryId(Float spotLatitude, Float spotLongitude, Integer memoryId);
    Optional<MemorySpot> findByIdSpotLatitudeAndIdSpotLongitudeAndIdMemoryID(Double spotLatitude, Double spotLongitude, Integer memoryId);

    List<MemorySpot> findAllById_MemoryId(Integer memoryId);
}
