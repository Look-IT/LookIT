package lookIT.lookITspring.service;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.FriendListDto;
import lookIT.lookITspring.dto.FriendSearchDto;
import lookIT.lookITspring.entity.Friends;
import lookIT.lookITspring.entity.FriendsId;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.FriendsRepository;
import lookIT.lookITspring.repository.UserRepository;

@RequiredArgsConstructor
@Transactional
public class FriendService {

  private final UserRepository userRepository;
  private final FriendsRepository friendsRepository;

  public List<FriendSearchDto> friendInfoIncludingTagId(String tagId) {
    List<User> friends = userRepository.findAll();
    List<FriendSearchDto> result = new ArrayList<>();

    for (User friend : friends){
      if(friend.getTagId().contains(tagId)) {
        FriendSearchDto friendSearchDto = new FriendSearchDto(
            friend.getUserId(),
            friend.getTagId(),
            friend.getNickName());
        result.add(friendSearchDto);
      }
    }
    return result;
  }

  public boolean friendRequest(Long friendId, Long userId) {
    User friend = userRepository.findById(friendId).orElseThrow(() -> new IllegalArgumentException("Invalid friendId"));
    User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid userId"));
    Friends friends = new Friends(friend, user, "R");
    friendsRepository.save(friends);
    return true;
  }

  public List<FriendListDto> getFriendsRequestList(Long userId){
    List<Friends> myFriends = friendsRepository.findByFriendsId_Friend_UserId(userId);
    List<FriendListDto> friendList = new ArrayList<>();

    for(Friends myFriend : myFriends){
      if(myFriend.getStatus().equals("R")){
        FriendListDto friendListDto = new FriendListDto(
            myFriend.getFriendsId().getUser().getTagId(),
            myFriend.getFriendsId().getUser().getNickName());
        friendList.add(friendListDto);
      }
    }
    return friendList;
  }

  public boolean friendAccept(Long friendId, Long userId){
    User friend = userRepository.findById(friendId).orElseThrow(() -> new IllegalArgumentException("Invalid friendId"));
    User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid userId"));

    FriendsId friendsId = new FriendsId(friend, user);
    Friends checkRequest = friendsRepository.findById(friendsId).orElse(null);
    if(checkRequest != null){
      checkRequest.setStatus("A");
      friendsRepository.save(checkRequest);
      return true;
    } else {
      System.out.println("친구 요청이 되지 않은 상태입니다.");
      return false;
    }
  }

  public List<FriendListDto> getMyfriendList(Long userId){
    List<Friends> myFriends = friendsRepository.findByFriendsId_User_UserId(userId);
    List<FriendListDto>  friendList = new ArrayList<>();

    for(Friends myFriend : myFriends){
      if(myFriend.getStatus().equals("A")){
        FriendListDto friendListDto = new FriendListDto(
          myFriend.getFriendsId().getFriend().getTagId(),
          myFriend.getFriendsId().getFriend().getNickName());
        friendList.add(friendListDto);
      }
    }
    return friendList;
  }

}
