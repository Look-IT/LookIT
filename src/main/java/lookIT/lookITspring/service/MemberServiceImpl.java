package lookIT.lookITspring.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.MemberSignUpRequestDto;
import lookIT.lookITspring.entity.Member;
import lookIT.lookITspring.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	@Override
	public Long signUp(MemberSignUpRequestDto requestDto) throws Exception {

		if (memberRepository.findByEmail(requestDto.getEmail()).isPresent()){
			throw new Exception("이미 존재하는 이메일입니다.");
		}

		Member member = memberRepository.save(requestDto.toEntity());
		member.encodePassword(passwordEncoder);
		return member.getId();
	}
}
