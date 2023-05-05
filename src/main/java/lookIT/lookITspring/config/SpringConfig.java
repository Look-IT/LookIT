package lookIT.lookITspring.config;

import lookIT.lookITspring.repository.MemberRepository;
import lookIT.lookITspring.repository.MemorySpotRepository;
import lookIT.lookITspring.security.CustomUserDetailsService;
import lookIT.lookITspring.security.JwtProvider;
import lookIT.lookITspring.service.MemberService;
import lookIT.lookITspring.service.MemberServiceImpl;
import lookIT.lookITspring.service.MemorySpotService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SpringConfig {

	private final MemberRepository memberRepository;

	public SpringConfig(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean JwtProvider jwtProvider(){
		return new JwtProvider(cumstomUserDetailsService());
	}

	@Bean
	public MemberService memberService() {
		return new MemberServiceImpl(memberRepository, passwordEncoder(), jwtProvider());
	}

	@Bean
	public CustomUserDetailsService cumstomUserDetailsService(){
		return new CustomUserDetailsService(memberRepository);
	}
}