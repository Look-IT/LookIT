package lookIT.lookITspring.controller;

import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemoryCreateRequestDto;
import lookIT.lookITspring.dto.UserJoinRequestDto;
import lookIT.lookITspring.service.MemoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/memory")
@RestController
public class MemoryController {

	private final MemoryService memoryService;

	@PostMapping("/create")
	public boolean memoryCreate(@Valid @RequestBody MemoryCreateRequestDto request) throws Exception {
		return memoryService.memoryCreate(request);
	}
}
