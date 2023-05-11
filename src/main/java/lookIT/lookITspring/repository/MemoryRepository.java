package lookIT.lookITspring.repository;

import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoryRepository extends JpaRepository<Memory, Long> {

}
