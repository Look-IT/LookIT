package lookIT.lookITspring.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class FriendTagsId implements Serializable {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "memoryId", nullable = false)
  private Memory memory;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "userId", nullable = false)
  private User user;
}
