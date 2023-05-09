package lookIT.lookITspring.service;

import java.util.HashMap;
import java.util.Map;
import javax.transaction.Transactional;
import lookIT.lookITspring.dto.UserJoinRequestDto;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.security.JwtProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
public class UserServiceIntegrationTest {

	@Autowired
	UserService userService;
	@Autowired
	UserRepository userRepository;
	@Autowired JwtProvider jwtProvider;

	@Test
	public void 회원가입() throws Exception {

		//Given
		String tagName = "ddd";
		String email = "ddd@ajou.ac.kr";
		String password = "12345abc!";
		String nickName = "abcChocolate";

		UserJoinRequestDto member = new UserJoinRequestDto(tagName, email, password, nickName);

		//When
		Integer saveId = userService.join(member);

		//Then
		User findUser = userRepository.findById(saveId).get();
		assertEquals(member.getTagId(), findUser.getTagId());
	}

	@Test
	public void 중복_이메일_예외() throws Exception {
		//Given
		String tagName = "ccc";
		String email = "ccc@ajou.ac.kr";
		String password = "12345abc!";
		String nickName = "abcChocolate";

		UserJoinRequestDto member1 = new UserJoinRequestDto(tagName, email, password, nickName);
		UserJoinRequestDto member2 = new UserJoinRequestDto(tagName, email, password, nickName);
		//When
		userService.join(member1);
		IllegalStateException e = assertThrows(IllegalStateException.class,
			() -> userService.join(member2)); // 예외가 발생해야 한다.

		assertThat(e.getMessage()).isEqualTo("이미 존재하는 이메일입니다.");
	}

	@Test
	public void 로그인() throws Exception {
		
		//Given
		String tagName = "abc";
		String email = "abc@ajou.ac.kr";
		String password = "12345abc!";
		String nickName = "abcChocolate";
		UserJoinRequestDto member1 = new UserJoinRequestDto(tagName, email, password, nickName);
		Integer saveId = userService.join(member1);

		Map<String, String> member = new HashMap<>();
		member.put("email", email);
		member.put("password", password);

		//When
		String token = userService.login(member);

		//Then
		String findToken = jwtProvider.createToken(email);
		assertEquals(token, findToken);
	}
}
