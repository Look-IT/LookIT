package lookIT.lookITspring.service;

import java.util.Map;
import lookIT.lookITspring.dto.MemberSignUpRequestDto;

public interface MemberService {

	// 회원가입
	public Long signUp(MemberSignUpRequestDto requestDto) throws Exception;
	public String login(Map<String, String> members);
	public boolean checkIdDuplicate(String tagName);
}
