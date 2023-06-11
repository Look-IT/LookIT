package lookIT.lookITspring.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.FriendListDto;
import lookIT.lookITspring.service.FriendService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
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
    public List<FriendListDto> getUserByTagId(@RequestParam String tagId,
        @RequestHeader("token") String token) {
        return friendService.friendInfoIncludingTagId(tagId, token);
    }

    @GetMapping("/my")
    public FriendListDto getMyInfo(@RequestHeader("token") String token) {
        return friendService.myInfo(token);
    }

    @PostMapping("/request")
    @ResponseStatus(HttpStatus.OK)
    public boolean friendRequest(@RequestParam String tagId, @RequestHeader("token") String token)
        throws Exception {
        return friendService.friendRequest(tagId, token);
    }

    @PostMapping("/accept")
    @ResponseStatus(HttpStatus.OK)
    public boolean friendAccept(@RequestParam String tagId, @RequestHeader("token") String token)
        throws Exception {
        return friendService.friendAccept(tagId, token);
    }

    @DeleteMapping("/reject")
    public boolean friendReject(@RequestParam String tagId, @RequestHeader("token") String token)
        throws Exception {
        return friendService.friendReject(tagId, token);
    }

    @GetMapping("/request")
    public List<FriendListDto> getMyRequest(@RequestHeader("token") String token) {
        return friendService.myRequestList(token);
    }

    @DeleteMapping("/request")
    public boolean friendRequestCancel(@RequestParam String tagId,
        @RequestHeader("token") String token) {
        return friendService.myRequestCancel(tagId, token);
    }

    @GetMapping("/accept")
    public List<FriendListDto> getFriendRequest(@RequestHeader("token") String token) {
        return friendService.friendsRequestList(token);
    }

    @GetMapping("/list")
    public List<FriendListDto> myFriendList(@RequestHeader("token") String token) {
        return friendService.getMyfriendList(token);
    }

}
