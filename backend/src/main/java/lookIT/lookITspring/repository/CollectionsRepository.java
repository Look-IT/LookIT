package lookIT.lookITspring.repository;

import lookIT.lookITspring.entity.Collections;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CollectionsRepository extends JpaRepository<Collections, Long> {
    @Query("SELECT c FROM Collections c JOIN c.user u WHERE u.id = :userId ORDER BY c.createAt DESC")
    List<Collections> findAllByUserIdOrderByCreateAtDesc(@Param("userId") Long userId);

    @Query("SELECT c FROM Collections c JOIN c.tags t WHERE t.id = :tagId ORDER BY c.createAt DESC")
    List<Collections> findAllByTagIdOrderByCreateAtDesc(@Param("tagId") String tagId);
}
