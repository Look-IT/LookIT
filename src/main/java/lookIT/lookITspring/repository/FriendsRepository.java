package lookIT.lookITspring.repository;
import java.util.List;
import lookIT.lookITspring.entity.Friends;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendsRepository extends JpaRepository<Friends, Integer> {
  List<Friends> getFriendsByUserId(Integer integer);

}