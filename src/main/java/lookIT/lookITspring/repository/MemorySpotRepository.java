package lookIT.lookITspring.repository;


import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.entity.MemorySpotId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemorySpotRepository extends JpaRepository<MemorySpot, MemorySpotId> {
    List<MemorySpot> findAllById_MemoryID(Integer memoryID);
}
