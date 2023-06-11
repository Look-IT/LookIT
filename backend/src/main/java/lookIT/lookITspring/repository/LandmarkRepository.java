package lookIT.lookITspring.repository;

import java.util.List;
import lookIT.lookITspring.entity.Landmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LandmarkRepository extends JpaRepository<Landmark, Long> {

    @Query("SELECT l.landmarkId, l.landLatitude, l.landLongitude FROM Landmark l")
    List<Object[]> findAllLandmarks();

}
