package lookIT.lookITspring.controller;

import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemoryCreateRequestDto;
import lookIT.lookITspring.dto.MemoryListDto;
import lookIT.lookITspring.service.MemoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/memories")
@RestController
public class MemoryController {

  private final MemoryService memoryService;

  @PostMapping("/create")
  @ResponseStatus(HttpStatus.OK)
  public Long memoryCreate(@Valid @RequestHeader String token, @RequestBody MemoryCreateRequestDto request) throws Exception {
    return memoryService.memoryCreate(token, request);
  }

  @PostMapping("/info")
  public boolean createInfoTags(@RequestParam("memoryId") Long memoryId, @RequestBody List<Map<String, String>> request){
    return memoryService.createInfoTags(memoryId, request);
  }

  @GetMapping("/info")
  public List<MemoryListDto> searchMemoryByInfoTags(@RequestHeader("token") String token, @RequestParam String info){
    return memoryService.searchMemoryByInfoTags(token, info);
  }

  @PostMapping("/info/delete")
  public boolean deleteInfoTag(@RequestBody Map<String, String> infoId){
    return memoryService.deleteInfoTag(infoId);
  }

  @GetMapping("/list")
  @ResponseBody
  public List<MemoryListDto> getMemoryListById(@RequestHeader("token") String token){
    return memoryService.memoryListInquiry(token);
  }

  @GetMapping("/friendList")
  @ResponseBody
  public List<MemoryListDto> getMemoryListByTagId(@RequestParam String tagId){
    return memoryService.friendMemoryListInquiry(tagId);
  }

  @PostMapping("/friendTag")
  public String postMemoryFriendTag(@RequestBody String[] friendsList, @RequestParam Long memoryId){
    return memoryService.memoryFriendTag(friendsList, memoryId);
  }

  @GetMapping("/taggedFriendList")
  @ResponseBody
  public List<Map<String, String>> getTaggedFriendListByMemoryId(@RequestParam Long memoryId){
    return memoryService.getTaggedFriendListByMemoryId(memoryId);
  }

  @DeleteMapping("")
  public boolean deleteMemory(@RequestHeader String token, @RequestParam Long memoryId){
    return memoryService.deleteMemory(token, memoryId);
  }

}
