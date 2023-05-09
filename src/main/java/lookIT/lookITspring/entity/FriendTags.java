package lookIT.lookITspring.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class FriendTags {

  @EmbeddedId
  private FriendTagsId friendTagsId;



}
