package lookIT.lookITspring.repository;

import java.util.List;
import lookIT.lookITspring.entity.InfoTags;
import lookIT.lookITspring.entity.InfoTagsId;
import lookIT.lookITspring.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoTagsRepository extends JpaRepository<InfoTags, InfoTagsId> {

  List<InfoTags> findByInfoTagsIdMemory(Memory memory);
  List<InfoTags> findByInfoTagsIdInfo(String info);
  void deleteAllByInfoTagsIdMemory(Memory memory);
}
