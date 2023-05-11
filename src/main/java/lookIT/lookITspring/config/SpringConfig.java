package lookIT.lookITspring.config;

import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.repository.LandmarkRepository;
import lookIT.lookITspring.repository.MemoryRepository;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.repository.MemorySpotRepository;
import lookIT.lookITspring.security.CustomUserDetailsService;
import lookIT.lookITspring.security.JwtProvider;
import lookIT.lookITspring.service.UserService;
import lookIT.lookITspring.service.UserServiceImpl;
import lookIT.lookITspring.service.MemorySpotService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SpringConfig {

	private final UserRepository userRepository;
	private final MemorySpotRepository memorySpotRepository;
	private final LandmarkRepository landmarkRepository;
	private final MemoryRepository memoryRepository;

	public SpringConfig(UserRepository userRepository,
		MemorySpotRepository memorySpotRepository, LandmarkRepository landmarkRepository,
		MemoryRepository memoryRepository) {
		this.userRepository = userRepository;
		this.memorySpotRepository = memorySpotRepository;
		this.landmarkRepository = landmarkRepository;
		this.memoryRepository = memoryRepository;
	}

	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean JwtProvider jwtProvider(){
		return new JwtProvider(customUserDetailsService());
	}

	@Bean
	public UserService memberService() {
		return new UserServiceImpl(userRepository, passwordEncoder(), jwtProvider());
	}

	@Bean
	public CustomUserDetailsService customUserDetailsService(){
		return new CustomUserDetailsService(userRepository);
	}

	@Bean
	public MemorySpotService memorySpotService(MemorySpotRepository memorySpotRepository, MemoryRepository memoryRepository){
		return new MemorySpotService(memorySpotRepository, memoryRepository);
	}
}