package lookIT.lookITspring.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lookIT.lookITspring.dto.LinePathDto;
import lookIT.lookITspring.dto.MemoryCreateRequestDto;
import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.repository.MemoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional
public class MemoryServiceTest {

	@Autowired
	MemoryService memoryService;
	@Autowired
	MemoryRepository memoryRepository;

	@Test
	public void memoryCreateTest() throws Exception {

		//Given
		long userId = 2;
		List<LinePathDto> path = new ArrayList<>();
		LinePathDto path1 = new LinePathDto(101.1, 101.2);
		LinePathDto path2 = new LinePathDto(101.3, 101.4);
		path.add(path1);
		path.add(path2);
		MemoryCreateRequestDto memory = new MemoryCreateRequestDto(userId, path);

		//When
		Long memoryId = memoryService.memoryCreate(memory);

		//Then
		Memory findMemory = memoryRepository.findById(memoryId).get();
		assertEquals(memory.getUserId(), findMemory.getUser().getUserId());
	}
}
