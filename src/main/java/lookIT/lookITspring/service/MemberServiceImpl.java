package lookIT.lookITspring.service;

import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemberSignUpRequestDto;
import lookIT.lookITspring.entity.Member;
import lookIT.lookITspring.repository.MemberRepository;
import lookIT.lookITspring.security.JwtProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtProvider jwtProvider;

	@Transactional
	@Override
	public Long signUp(MemberSignUpRequestDto requestDto) throws Exception {

		if (memberRepository.findByEmail(requestDto.getEmail()).isPresent()) {
			throw new IllegalStateException("이미 존재하는 이메일입니다.");
		}

		Member member = memberRepository.save(requestDto.toEntity());
		member.encodePassword(passwordEncoder);

		return member.getId();
	}

	@Override
	public String login(Map<String, String> members) {
		Member member = memberRepository.findByEmail(members.get("email"))
			.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 Email 입니다."));

		String password = members.get("password");
		if (!passwordEncoder.matches(password, member.getPassword())) {
			throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
		}

		return jwtProvider.createToken(member.getEmail());
	}

	@Override
	public boolean checkIdDuplicate(String tagId){
		Optional<Member> optionalMember = memberRepository.findByTagId(tagId);
		try{
			Member member = optionalMember.get();
			return false;
		}catch (Exception e) {
			return true;
		}
	}
}