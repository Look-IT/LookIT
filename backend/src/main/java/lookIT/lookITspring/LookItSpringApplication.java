package lookIT.lookITspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

	@EnableJpaAuditing
	@SpringBootApplication
	public class LookItSpringApplication {

		public static void main(String[] args) {
		SpringApplication.run(LookItSpringApplication.class, args);
	}
}
