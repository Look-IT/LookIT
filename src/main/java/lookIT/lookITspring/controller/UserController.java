package lookIT.lookITspring.controller;

import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.UserJoinRequestDto;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
public class UserController {

	private final UserService userService;
	private final UserRepository userRepository;

	@PostMapping("/join")
	@ResponseStatus(HttpStatus.OK)
	public Long join(@Valid @RequestBody UserJoinRequestDto request) throws Exception {
		return userService.join(request);
	}

	@PostMapping("/login")
	public String login(@RequestBody Map<String, String> member) {
		return userService.login(member);
	}

	@GetMapping("/join/exists")
	public ResponseEntity<Boolean> checkIdDuplicate(@RequestParam("tagId") String tagId){
		return ResponseEntity.ok(userService.checkIdDuplicate(tagId));
	}
}