package lookIT.lookITspring.security;

import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(username).orElseThrow(
			() -> new UsernameNotFoundException("Invalid authentication!")
		);

		return new CustomUserDetails(user);
	}
}
