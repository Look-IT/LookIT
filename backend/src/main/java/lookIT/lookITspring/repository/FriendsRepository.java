package lookIT.lookITspring.repository;

import java.util.List;
import lookIT.lookITspring.entity.Friends;
import lookIT.lookITspring.entity.FriendsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendsRepository extends JpaRepository<Friends, FriendsId> {

    List<Friends> findByFriendsId_User_UserId(Long userId);

    List<Friends> findByFriendsId_Friend_UserId(Long userId);

}
