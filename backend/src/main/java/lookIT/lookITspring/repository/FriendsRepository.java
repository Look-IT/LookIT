package lookIT.lookITspring.repository;

import lookIT.lookITspring.entity.Friends;
import lookIT.lookITspring.entity.FriendsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendsRepository extends JpaRepository<Friends, FriendsId> {

}
