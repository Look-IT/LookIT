package lookIT.lookITspring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendSearchDto {

  private Long userId;

  private String tagId;

  private String nickName;

}
