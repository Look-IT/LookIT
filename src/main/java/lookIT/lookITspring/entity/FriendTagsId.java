package lookIT.lookITspring.entity;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class FriendTagsId implements Serializable {

  @ManyToOne(targetEntity = Memory.class)
  @JoinColumn
  private Integer memoryId;

  @ManyToOne(targetEntity = Member.class)
  @JoinColumn
  private Integer userId;
}
