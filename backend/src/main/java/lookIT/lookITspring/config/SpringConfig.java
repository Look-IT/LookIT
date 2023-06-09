package lookIT.lookITspring.config;

import lookIT.lookITspring.repository.CollectionsRepository;
import lookIT.lookITspring.repository.FriendTagsRepository;
import lookIT.lookITspring.repository.FriendsRepository;
import lookIT.lookITspring.repository.InfoTagsRepository;
import lookIT.lookITspring.repository.LandmarkRepository;
import lookIT.lookITspring.repository.LinePathRepository;
import lookIT.lookITspring.repository.MemoryPhotoRepository;
import lookIT.lookITspring.repository.MemoryRepository;
import lookIT.lookITspring.repository.PhotoTagsRepository;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.repository.MemorySpotRepository;
import lookIT.lookITspring.security.CustomUserDetailsService;
import lookIT.lookITspring.security.JwtProvider;
import lookIT.lookITspring.service.EmailService;
import lookIT.lookITspring.service.FriendService;
import lookIT.lookITspring.service.LandmarkService;
import lookIT.lookITspring.service.MemoryService;
import lookIT.lookITspring.service.Photo4CutService;
import lookIT.lookITspring.service.UserService;
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
	private final LinePathRepository linePathRepository;
	private final FriendTagsRepository friendTagsRepository;
	private final InfoTagsRepository infoTagsRepository;
	private final FriendsRepository friendsRepository;
	private final MemoryPhotoRepository memoryPhotoRepository;
	private final PhotoTagsRepository photoTagsRepository;
	private final CollectionsRepository collectionsRepository;

	public SpringConfig(UserRepository userRepository,
						MemorySpotRepository memorySpotRepository, LandmarkRepository landmarkRepository,
						MemoryRepository memoryRepository, LinePathRepository linePathRepository,
						FriendTagsRepository friendTagsRepository, InfoTagsRepository infoTagsRepository,
						FriendsRepository friendsRepository, MemoryPhotoRepository memoryPhotoRepository,
						PhotoTagsRepository photoTagsRepository, CollectionsRepository collectionsRepository) {

		this.userRepository = userRepository;
		this.memorySpotRepository = memorySpotRepository;
		this.landmarkRepository = landmarkRepository;
		this.memoryRepository = memoryRepository;
		this.linePathRepository = linePathRepository;
		this.friendTagsRepository = friendTagsRepository;
		this.infoTagsRepository = infoTagsRepository;
		this.friendsRepository = friendsRepository;
		this.memoryPhotoRepository = memoryPhotoRepository;
		this.photoTagsRepository = photoTagsRepository;
		this.collectionsRepository = collectionsRepository;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public JwtProvider jwtProvider() {
		return new JwtProvider(customUserDetailsService());
	}

	@Bean
	public UserService memberService() {
		return new UserService(userRepository, passwordEncoder(), jwtProvider());
	}

	@Bean
	public CustomUserDetailsService customUserDetailsService() {
		return new CustomUserDetailsService(userRepository);
	}

	@Bean
	public MemorySpotService memorySpotService(MemorySpotRepository memorySpotRepository, MemoryRepository memoryRepository, MemoryPhotoRepository memoryPhotoRepository, LinePathRepository linePathRepository) {
		return new MemorySpotService(memorySpotRepository, memoryRepository, memoryPhotoRepository, linePathRepository);
	}

	@Bean
	public MemoryService memoryService() {
		return new MemoryService(userRepository, memoryRepository, linePathRepository, friendTagsRepository, infoTagsRepository, memorySpotRepository, memoryPhotoRepository, jwtProvider());
	}

	@Bean
	public LandmarkService landmarkService() {
		return new LandmarkService(landmarkRepository);
	}

	@Bean
	public FriendService friendService() {
		return new FriendService(userRepository, friendsRepository, jwtProvider());
	}

	@Bean
	public Photo4CutService photo4CutService() {
		return new Photo4CutService(landmarkRepository, collectionsRepository, userRepository, photoTagsRepository);
	}
}
