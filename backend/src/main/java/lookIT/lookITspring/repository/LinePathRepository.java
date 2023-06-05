package lookIT.lookITspring.repository;

import lookIT.lookITspring.entity.LinePath;
import lookIT.lookITspring.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LinePathRepository extends JpaRepository<LinePath, Long> {
    List<LinePath> findByMemory(Memory memory);
    void deleteAllByMemory(Memory memory);
}
