package lookIT.lookITspring.controller;
import java.util.Optional;
import lookIT.lookITspring.entity.Friends;
import lookIT.lookITspring.repository.FriendsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friends")
public class FriendsController {

  @Autowired
  private FriendsRepository friendRepository;

  @GetMapping(value = "/{userID}")
  public Optional<Friends> getFriendsByUserId(@RequestParam("userID") Integer userID) {
    return friendRepository.findById(userID);
  }

}
