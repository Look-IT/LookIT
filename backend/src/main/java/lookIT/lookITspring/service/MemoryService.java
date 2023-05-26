package lookIT.lookITspring.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.FriendTagsDto;
import lookIT.lookITspring.dto.InfoTagsDto;
import lookIT.lookITspring.dto.LinePathDto;
import lookIT.lookITspring.dto.MemoryCreateRequestDto;
import lookIT.lookITspring.dto.MemoryListDto;
import lookIT.lookITspring.entity.FriendTags;
import lookIT.lookITspring.entity.FriendTagsId;
import lookIT.lookITspring.entity.InfoTags;
import lookIT.lookITspring.entity.LinePath;
import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.entity.MemoryPhoto;
import lookIT.lookITspring.entity.MemorySpot;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.FriendTagsRepository;
import lookIT.lookITspring.repository.InfoTagsRepository;
import lookIT.lookITspring.repository.LinePathRepository;
import lookIT.lookITspring.repository.MemoryPhotoRepository;
import lookIT.lookITspring.repository.MemoryRepository;
import lookIT.lookITspring.repository.MemorySpotRepository;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.security.JwtProvider;

@RequiredArgsConstructor
@Transactional
public class MemoryService {

	private final UserRepository userRepository;
	private final MemoryRepository memoryRepository;
	private final LinePathRepository linePathRepository;
	private final FriendTagsRepository friendTagsRepository;
	private final InfoTagsRepository infoTagsRepository;
	private final MemorySpotRepository memorySpotRepository;
	private final MemoryPhotoRepository memoryPhotoRepository;
	private final JwtProvider jwtProvider;

	public Long memoryCreate(String token, MemoryCreateRequestDto requestDto) throws Exception{
		try{
			Long userId = jwtProvider.getUserId(token);
			User user = userRepository.findById(userId).get();
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
			return rememory.getMemoryId();
		} catch(Exception e){
			return new Long(-1);
		}
	}

	public List<MemoryListDto> memoryListInquiry(String token){
		Long userId = jwtProvider.getUserId(token);
		List<Memory> memories = memoryRepository.findByUser_UserId(userId);
		List<MemoryListDto> result = new ArrayList<>();
		for (Memory memory : memories) {
			Long memoryId = memory.getMemoryId();
			List<MemorySpot> memorySpots = memorySpotRepository.findAllByMemory(memory);
			String memoryPhoto = "";

		if (memorySpots.size()!=0) {
			MemorySpot memorySpot = memorySpots.get(0);
			List<MemoryPhoto> memoryPhotos = memoryPhotoRepository.findAllByMemorySpot(memorySpot);
				if (memoryPhotos.size()!=0) {
					MemoryPhoto memoryPhotoEntity = memoryPhotos.get(0);
					memoryPhoto = memoryPhotoEntity.getMemoryPhoto();
				}
		}

		LocalDateTime createAt = memory.getCreateAt();
		List<InfoTagsDto> info = getInfoTagsDtoList(memoryId);
		List<FriendTagsDto> friends = getFriendTagsDtoList(memoryId);

		MemoryListDto memoryListDto = new MemoryListDto(memoryId, memoryPhoto, createAt, info, friends);
		result.add(memoryListDto);
		}
		return result;
	}


	private List<FriendTagsDto> getFriendTagsDtoList(Long memoryId) {
		Memory memory = memoryRepository.findById(memoryId).get();
		List<FriendTags> friendTagsList = friendTagsRepository.findByFriendTagsId_Memory(memory);
		List<FriendTagsDto> friendTagsDtoList = new ArrayList<>();
		for (FriendTags friendTags : friendTagsList) {
			User user = friendTags.getFriendTagsId().getUser();
			String tagId = user.getTagId();
			friendTagsDtoList.add(new FriendTagsDto(tagId));
		}
		return friendTagsDtoList;
	}

	private List<InfoTagsDto> getInfoTagsDtoList(Long memoryId) {
    Memory memory = memoryRepository.findById(memoryId).get();
    List<InfoTags> infoTagsList = infoTagsRepository.findByInfoTagsIdMemory(memory);
		List<InfoTagsDto> infoTagsDtoList = new ArrayList<>();
		for (InfoTags infoTag : infoTagsList) {
			String info = infoTag.getInfoTagsId().getInfo();
			infoTagsDtoList.add(new InfoTagsDto(info));
		}
		return infoTagsDtoList;
	}

	public String memoryFriendTag(String[] friendsList, Long memoryId){
		Memory memory = memoryRepository.findById(memoryId).get();

		if(friendsList.length != 0){
			for (String friend : friendsList){
				User tagFriend = userRepository.findByTagId(friend).orElseThrow(() -> new IllegalArgumentException("Invalid tagId"));
				FriendTagsId friendTagsId = new FriendTagsId(memory, tagFriend);
				FriendTags friendTags = new FriendTags(friendTagsId);
				friendTagsRepository.save(friendTags);
			}
			return "Friends tagged successfully";
		} else {
			return "No friends to tag";
		}
	}
}
