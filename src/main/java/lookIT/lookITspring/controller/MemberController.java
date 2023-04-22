package lookIT.lookITspring.controller;

import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemberSignUpRequestDto;
import lookIT.lookITspring.repository.MemberRepository;
import lookIT.lookITspring.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
		return memberService.signUp(request);
	}
}