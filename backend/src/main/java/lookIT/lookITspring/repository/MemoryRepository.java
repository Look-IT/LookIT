package lookIT.lookITspring.repository;

import java.util.List;
import lookIT.lookITspring.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoryRepository extends JpaRepository<Memory, Long> {

    List<Memory> findByUser_UserId(Long userId);

    List<Memory> findByUser_tagId(String tagId);
}
