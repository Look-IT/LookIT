package lookIT.lookITspring.controller;

import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemberSignUpRequestDto;
import lookIT.lookITspring.repository.MemberRepository;
import lookIT.lookITspring.service.MemberService;
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
public class MemberController {

	private final MemberService memberService;
	private final MemberRepository memberRepository;

	@PostMapping("/join")
	@ResponseStatus(HttpStatus.OK)
	public Long join(@Valid @RequestBody MemberSignUpRequestDto request) throws Exception {
		System.out.println(request);
		return memberService.signUp(request);
	}

	@PostMapping("/login")
	public String login(@RequestBody Map<String, String> member) {
		return memberService.login(member);
	}

	@GetMapping("/join/exists")
	public ResponseEntity<Boolean> checkIdDuplicate(@RequestParam("tagName") String tagName){
		return ResponseEntity.ok(memberService.checkIdDuplicate(tagName));
	}
}