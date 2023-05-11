package lookIT.lookITspring.repository;

import java.util.Optional;
import lookIT.lookITspring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	Optional<User> findByTagId(String tagId);
}

