package lookIT.lookITspring.repository;


import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.entity.MemorySpotId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemorySpotRepository extends JpaRepository<MemorySpot, MemorySpotId> {
    //MemorySpot findBySpotLatitudeAndSpotLongitudeAndMemoryID(Float spotLatitude, Float spotLongitude, Integer memoryID);
    Optional<MemorySpot> findByIdSpotLatitudeAndIdSpotLongitudeAndIdMemoryID(Float spotLatitude, Float spotLongitude, Integer memoryId);
}
