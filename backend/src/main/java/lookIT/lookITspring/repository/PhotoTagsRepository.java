package lookIT.lookITspring.repository;

import lookIT.lookITspring.entity.PhotoTags;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PhotoTagsRepository extends JpaRepository<PhotoTags, Long> {
    List<PhotoTags> findByTagId(String tagId);
}

