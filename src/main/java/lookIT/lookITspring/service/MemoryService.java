package lookIT.lookITspring.service;

import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.LinePathDto;
import lookIT.lookITspring.dto.MemoryCreateRequestDto;
import lookIT.lookITspring.entity.LinePath;
import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.LinePathRepository;
import lookIT.lookITspring.repository.MemoryRepository;
import lookIT.lookITspring.repository.UserRepository;

@RequiredArgsConstructor
@Transactional
public class MemoryService {

	private final UserRepository userRepository;
	private final MemoryRepository memoryRepository;
	private final LinePathRepository linePathRepository;

	public boolean memoryCreate(MemoryCreateRequestDto requestDto) throws Exception{
		try{
			User user = userRepository.findById(requestDto.getUserId()).get();
			Memory memory = Memory.builder()
				.user(user)
				.build();
			Memory rememory = memoryRepository.save(memory);

			for(LinePathDto lp: requestDto.getPath()){
				LinePath linePath = LinePath.builder()
					.latitude(lp.getLatitude())
					.longitude(lp.getLongitude())
					.memory(rememory)
					.build();
				LinePath relinePath = linePathRepository.save(linePath);
			}
		} catch(Exception e){
			return false;
		}
		return true;
	}
}
