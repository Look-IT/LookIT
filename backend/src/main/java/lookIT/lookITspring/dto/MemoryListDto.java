package lookIT.lookITspring.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemoryListDto {

    private Long memoryId;

    private String memoryPhoto;

    private String createAt;

    private List<InfoTagsDto> info;

    private List<FriendTagsDto> friends;

}