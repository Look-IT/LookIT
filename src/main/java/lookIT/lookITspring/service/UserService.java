package lookIT.lookITspring.service;

import java.util.Map;
import lookIT.lookITspring.dto.UserJoinRequestDto;

public interface UserService {

	public Long join(UserJoinRequestDto requestDto) throws Exception;
	public String login(Map<String, String> members);
	public boolean checkIdDuplicate(String tagId);
}
