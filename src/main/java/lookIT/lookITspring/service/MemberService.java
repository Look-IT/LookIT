package lookIT.lookITspring.service;

import lookIT.lookITspring.dto.MemberSignUpRequestDto;

public interface MemberService {

	// 회원가입
	public Long signUp(MemberSignUpRequestDto requestDto) throws Exception;
}
