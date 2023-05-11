package lookIT.lookITspring.repository;

import java.util.Optional;
import lookIT.lookITspring.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByEmail(String email);
	Optional<Member> findByTagId(String tagId);
}

