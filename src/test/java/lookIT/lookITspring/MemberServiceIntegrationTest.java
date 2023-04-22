package lookIT.lookITspring;

import javax.transaction.Transactional;
import lookIT.lookITspring.dto.MemberSignUpRequestDto;
import lookIT.lookITspring.entity.Member;
import lookIT.lookITspring.repository.MemberRepository;
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

	@Test
	public void 회원가입() throws Exception {

		//Given
		String tagName = "abc";
		String email = "abc@ajou.ac.kr";
		String password = "12345abc!";
		String nickName = "abcChocolate";

		MemberSignUpRequestDto member = new MemberSignUpRequestDto(tagName, email, password, nickName);

		//When
		Long saveId = memberService.signUp(member);

		//Then
		Member findMember = memberRepository.findById(saveId).get();
		assertEquals(member.getTagName(), findMember.getTagName());

	}
}
