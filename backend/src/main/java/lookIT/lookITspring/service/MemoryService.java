package lookIT.lookITspring.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
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
import lookIT.lookITspring.entity.InfoTagsId;
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
			MemoryListDto memoryListDto = createMemoryListDto(memory);
			result.add(memoryListDto);
		}
		Collections.reverse(result);
		return result;
	}

	public List<MemoryListDto> friendMemoryListInquiry(String tagId){
		List<Memory> memories = memoryRepository.findByUser_tagId(tagId);
		List<MemoryListDto> result = new ArrayList<>();
		for (Memory memory : memories) {
			MemoryListDto memoryListDto = createMemoryListDto(memory);
			result.add(memoryListDto);
		}
		Collections.reverse(result);
		return result;
	}

	public List<MemoryListDto> searchMemoryByInfoTags(String token, String info) {
		Long userId = jwtProvider.getUserId(token);
		List<InfoTags> infoTagsList = infoTagsRepository.findByInfoTagsIdInfo(info);
		List<Memory> memories = new ArrayList<>();
		List<MemoryListDto> result = new ArrayList<>();
		for (InfoTags infoTags : infoTagsList) {
			Memory memory = infoTags.getInfoTagsId().getMemory();
			if(memory.getUser().getUserId().equals(userId)){
				MemoryListDto memoryListDto = createMemoryListDto(memory);
				result.add(memoryListDto);
			}
		}
		Collections.reverse(result);
		return result;
	}

	private MemoryListDto createMemoryListDto(Memory memory) {
		Long memoryId = memory.getMemoryId();
		List<MemorySpot> memorySpots = memorySpotRepository.findAllByMemory(memory);
		String memoryPhoto = "";

		if (!memorySpots.isEmpty()) {
			MemorySpot memorySpot = memorySpots.get(0);
			List<MemoryPhoto> memoryPhotos = memoryPhotoRepository.findAllByMemorySpot(memorySpot);
			if (!memoryPhotos.isEmpty()) {
				MemoryPhoto memoryPhotoEntity = memoryPhotos.get(0);
				memoryPhoto = memoryPhotoEntity.getMemoryPhoto();
			}
		}

		LocalDateTime createAt = memory.getCreateAt();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd E", Locale.KOREA);
		String createAtFormatted = createAt.format(formatter);
		List<InfoTagsDto> info = getInfoTagsDtoList(memoryId);
		List<FriendTagsDto> friends = getFriendTagsDtoList(memoryId);

		return new MemoryListDto(memoryId, memoryPhoto, createAtFormatted, info, friends);
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

	public boolean createInfoTags(Long memoryId, List<Map<String, String>> request) {
		Memory memory = memoryRepository.findById(memoryId).get();
		for (Map<String, String> tag :  request){
			InfoTagsId infoTagsId = InfoTagsId.builder()
				.memory(memory)
				.info(tag.get("info"))
				.build();
			InfoTags infoTags = InfoTags.builder().infoTagsId(infoTagsId).build();
			infoTagsRepository.save(infoTags);
		}
		return true;
	}

	public List<Map<String, String>> getTaggedFriendListByMemoryId(Long memoryId) {
		Memory memory = memoryRepository.findById(memoryId).get();
		List<FriendTags> friendTags = friendTagsRepository.findByFriendTagsId_Memory(memory);
		List<Map<String, String>> friendList= new ArrayList<>();

		for(FriendTags friend : friendTags){
			Long userId = friend.getFriendTagsId().getUser().getUserId();
			User user = userRepository.findById(userId).get();
			Map<String, String> friendMap = new HashMap<>();
			friendMap.put("nickName", user.getNickName());
			friendMap.put("tagId", user.getTagId());
			friendList.add(friendMap);
		}
		return friendList;
	}

	public boolean deleteInfoTag(Map<String, String> infoId) {
		Long memoryId = Long.parseLong(infoId.get("memoryId"));
		Memory memory = memoryRepository.findById(memoryId).get();
		InfoTagsId infoTagsId = InfoTagsId.builder()
			.memory(memory)
			.info(infoId.get("info"))
			.build();
		infoTagsRepository.deleteById(infoTagsId);
		return true;
	}

	public void deleteLinePath(Memory memory){
		linePathRepository.deleteAllByMemory(memory);
	}

	public void deleteFriendTag(Long memoryId){
		Memory memory = memoryRepository.findById(memoryId).get();
		List<FriendTags> friendTags = friendTagsRepository.findByFriendTagsId_Memory(memory);
		for(FriendTags friend : friendTags) {
			Long userId = friend.getFriendTagsId().getUser().getUserId();
			User user = userRepository.findById(userId).get();
			FriendTagsId friendTagsId = new FriendTagsId(memory, user);
			friendTagsRepository.deleteByFriendTagsId(friendTagsId);
		}
	}

	public boolean deleteMemory(String token, Long memoryId) {
		Memory memory = memoryRepository.findById(memoryId).get();
		deleteLinePath(memory);
		/**
		 * 다른 팀원들
		 * 추억일지 핀 삭제
		 * 추억일지 핀 사진 삭제
		 * 추억일지 친구 태그 삭제
		 */
		// 추억일지 친구 태그 삭제
		deleteFriendTag(memoryId);

		// 추억일지 정보 태그 삭제
		Map<String, String> infoId = new HashMap<>();
		infoTagsRepository.deleteAllByInfoTagsIdMemory(memory);

		// 추억일지 삭제
		memoryRepository.delete(memory);
		return true;
	}
}
