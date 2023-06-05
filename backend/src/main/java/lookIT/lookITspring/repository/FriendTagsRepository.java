package lookIT.lookITspring.repository;

import java.util.List;
import lookIT.lookITspring.entity.FriendTags;
import lookIT.lookITspring.entity.FriendTagsId;
import lookIT.lookITspring.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendTagsRepository extends JpaRepository<FriendTags, FriendTagsId> {

  List<FriendTags> findByFriendTagsId_Memory(Memory memory);

  void deleteByFriendTagsId(FriendTagsId friendTagsId);
}
