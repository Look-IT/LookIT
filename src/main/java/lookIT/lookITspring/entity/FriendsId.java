package lookIT.lookITspring.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Getter
@Embeddable
public class FriendsId implements Serializable {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "friendId", nullable = false)
	private User friend;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userId", nullable = false)
	private User user;
}
