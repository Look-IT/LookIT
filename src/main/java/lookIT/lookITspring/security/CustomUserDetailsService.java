package lookIT.lookITspring.security;

import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.Member;
import lookIT.lookITspring.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Member member = memberRepository.findByEmail(username).orElseThrow(
			() -> new UsernameNotFoundException("Invalid authentication!")
		);

		return new CustomUserDetails(member);
	}
}
