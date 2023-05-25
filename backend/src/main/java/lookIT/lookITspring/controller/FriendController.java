package lookIT.lookITspring.controller;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.FriendListDto;
import lookIT.lookITspring.dto.FriendSearchDto;
import lookIT.lookITspring.service.FriendService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {

  private final FriendService friendService;

  @GetMapping
  public List<FriendSearchDto> getUserByTagId(@RequestParam String tagId){
   return friendService.friendInfoIncludingTagId(tagId);
  }

  @PostMapping("/request")
  @ResponseStatus(HttpStatus.OK)
  public boolean friendRequest(@RequestParam Long friendId, Long userId) throws Exception {
    return friendService.friendRequest(friendId, userId);
  }

  @GetMapping("/request")
  public List<FriendListDto> getFriendRequest(@RequestParam Long userId){
    return friendService.getFriendsRequestList(userId);
  }

  @PostMapping("/accept")
  @ResponseStatus(HttpStatus.OK)
  public boolean friendAccept(@RequestParam Long friendId, Long userId) throws Exception {
    return friendService.friendAccept(friendId, userId);
  }

  @GetMapping("/list")
  public List<FriendListDto> myFriendList(@RequestParam Long userId){
    return friendService.getMyfriendList(userId);
  }

}
