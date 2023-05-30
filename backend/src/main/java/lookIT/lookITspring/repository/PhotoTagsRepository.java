package lookIT.lookITspring.repository;

import lookIT.lookITspring.entity.Collections;
import lookIT.lookITspring.entity.PhotoTags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhotoTagsRepository extends JpaRepository<PhotoTags, Long> {
    List<PhotoTags> findByTagId(String tagId);
    List<PhotoTags> findByCollectionsPhoto4CutId(Long photo4cutId);
}

