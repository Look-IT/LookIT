package lookIT.lookITspring;

import java.util.HashMap;
import java.util.Map;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemberSignUpRequestDto;
import lookIT.lookITspring.entity.Member;
import lookIT.lookITspring.repository.MemberRepository;
import lookIT.lookITspring.security.JwtProvider;
import lookIT.lookITspring.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
public class MemberServiceIntegrationTest {

	@Autowired MemberService memberService;
	@Autowired MemberRepository memberRepository;
	@Autowired JwtProvider jwtProvider;

	@Test
	public void 회원가입() throws Exception {

		//Given
		String tagName = "ddd";
		String email = "ddd@ajou.ac.kr";
		String password = "12345abc!";
		String nickName = "abcChocolate";

		MemberSignUpRequestDto member = new MemberSignUpRequestDto(tagName, email, password, nickName);

		//When
		Long saveId = memberService.signUp(member);

		//Then
		Member findMember = memberRepository.findById(saveId).get();
		assertEquals(member.getTagName(), findMember.getTagName());
	}

	@Test
	public void 중복_이메일_예외() throws Exception {
		//Given
		String tagName = "ccc";
		String email = "ccc@ajou.ac.kr";
		String password = "12345abc!";
		String nickName = "abcChocolate";

		MemberSignUpRequestDto member1 = new MemberSignUpRequestDto(tagName, email, password, nickName);
		MemberSignUpRequestDto member2 = new MemberSignUpRequestDto(tagName, email, password, nickName);
		//When
		memberService.signUp(member1);
		IllegalStateException e = assertThrows(IllegalStateException.class,
			() -> memberService.signUp(member2)); // 예외가 발생해야 한다.

		assertThat(e.getMessage()).isEqualTo("이미 존재하는 이메일입니다.");
	}

	@Test
	public void 로그인() throws Exception {
		
		//Given
		String tagName = "abc";
		String email = "abc@ajou.ac.kr";
		String password = "12345abc!";
		String nickName = "abcChocolate";
		MemberSignUpRequestDto member1 = new MemberSignUpRequestDto(tagName, email, password, nickName);
		Long saveId = memberService.signUp(member1);

		Map<String, String> member = new HashMap<>();
		member.put("email", email);
		member.put("password", password);

		//When
		String token = memberService.login(member);

		//Then
		String findToken = jwtProvider.createToken(email);
		assertEquals(token, findToken);
	}
}
