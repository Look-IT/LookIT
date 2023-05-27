package lookIT.lookITspring.repository;

import lookIT.lookITspring.entity.PhotoTags;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoTagsRepository extends JpaRepository<PhotoTags, Long> {

}
