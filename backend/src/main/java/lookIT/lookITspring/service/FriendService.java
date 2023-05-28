package lookIT.lookITspring.service;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.FriendListDto;
import lookIT.lookITspring.entity.Friends;
import lookIT.lookITspring.entity.FriendsId;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.FriendsRepository;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.security.JwtProvider;

@RequiredArgsConstructor
@Transactional
public class FriendService {

  private final UserRepository userRepository;
  private final FriendsRepository friendsRepository;
  private final JwtProvider jwtProvider;

  public List<FriendListDto> friendInfoIncludingTagId(String tagId) {
    List<User> friends = userRepository.findAll();
    List<FriendListDto> result = new ArrayList<>();

    for (User friend : friends){
      if(friend.getTagId().contains(tagId)) {
        FriendListDto friendListDto = new FriendListDto(
            friend.getTagId(),
            friend.getNickName());
        result.add(friendListDto);
      }
    }
    return result;
  }

  public FriendListDto myInfo(String token){
    Long userId = jwtProvider.getUserId(token);
    User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid userId"));
    FriendListDto friendListDto = new FriendListDto(
        user.getTagId(),
        user.getNickName()
    );
    return friendListDto;
  }

  public boolean friendRequest(String tagId, String token) {
    Long userId = jwtProvider.getUserId(token);
    User friend = userRepository.findByTagId(tagId).orElseThrow(() -> new IllegalArgumentException("Invalid tagId"));
    User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid userId"));
    Friends friends = new Friends(friend, user, "R");
    friendsRepository.save(friends);
    return true;
  }

  public List<FriendListDto> friendsRequestList(String token){
    Long userId = jwtProvider.getUserId(token);
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

  public boolean friendAccept(String tagId, String token){
    Long userId = jwtProvider.getUserId(token);
    User friend = userRepository.findByTagId(tagId).orElseThrow(() -> new IllegalArgumentException("Invalid tagId"));
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

  public List<FriendListDto> myRequestList(String token){
    Long userId = jwtProvider.getUserId(token);
    List<Friends> myFriends = friendsRepository.findByFriendsId_User_UserId(userId);
    List<FriendListDto> friendList = new ArrayList<>();

    for(Friends myFriend : myFriends){
      if(myFriend.getStatus().equals("R")){
        FriendListDto friendListDto = new FriendListDto(
            myFriend.getFriendsId().getFriend().getTagId(),
            myFriend.getFriendsId().getFriend().getNickName());
        friendList.add(friendListDto);
      }
    }
    return friendList;
  }

  public List<FriendListDto> getMyfriendList(String token){
    Long userId = jwtProvider.getUserId(token);
    List<Friends> myFriends = friendsRepository.findByFriendsId_User_UserId(userId);
    List<FriendListDto> friendList = new ArrayList<>();

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
