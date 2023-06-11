package lookIT.lookITspring.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Friends")
public class Friends {

    @EmbeddedId
    private FriendsId friendsId;

    @Column(name = "status", nullable = false)
    private String status;

    public Friends(User friend, User user, String status) {
        this.friendsId = new FriendsId(friend, user);
        this.status = status;
    }
}
