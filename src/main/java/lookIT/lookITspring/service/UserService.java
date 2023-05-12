package lookIT.lookITspring.service;

import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.UserJoinRequestDto;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.security.JwtProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
@Transactional
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtProvider jwtProvider;

	@Transactional
	public Long join(UserJoinRequestDto requestDto) throws Exception {

		if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
			throw new IllegalStateException("이미 존재하는 이메일입니다.");
		}

		User user = userRepository.save(requestDto.toEntity());
		user.encodePassword(passwordEncoder);

		return user.getUserId();
	}

	public String login(Map<String, String> members) {
		User user = userRepository.findByEmail(members.get("email"))
			.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 Email 입니다."));

		String password = members.get("password");
		if (!passwordEncoder.matches(password, user.getPassword())) {
			throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
		}

		return jwtProvider.createToken(user.getEmail());
	}

	public boolean checkIdDuplicate(String tagId){
		Optional<User> optionalMember = userRepository.findByTagId(tagId);
		try{
			User user = optionalMember.get();
			return false;
		}catch (Exception e) {
			return true;
		}
	}
}