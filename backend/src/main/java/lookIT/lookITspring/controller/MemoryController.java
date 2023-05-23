package lookIT.lookITspring.controller;

import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemoryCreateRequestDto;
import lookIT.lookITspring.dto.MemoryListDto;
import lookIT.lookITspring.service.MemoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
/*
  @PostMapping("/create")
  @ResponseStatus(HttpStatus.OK)
  public Long memoryCreate(@Valid @RequestBody MemoryCreateRequestDto request) throws Exception {
    return memoryService.memoryCreate(request);
  }
*/
  @GetMapping("/list")
  @ResponseBody
  public List<MemoryListDto> getMemoryListById(@RequestParam Long userId){
  return memoryService.memoryListInquiry(userId);
  }
}
