package lookIT.lookITspring.controller;

import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemoryCreateRequestDto;
import lookIT.lookITspring.dto.MemoryListDto;
import lookIT.lookITspring.service.MemoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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

  @GetMapping("/list")
  @ResponseBody
  public List<MemoryListDto> getMemoryListById(@RequestHeader("token") String token){
  return memoryService.memoryListInquiry(token);
  }
}
