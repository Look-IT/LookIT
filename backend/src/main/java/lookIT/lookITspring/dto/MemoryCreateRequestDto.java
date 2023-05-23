package lookIT.lookITspring.dto;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lookIT.lookITspring.entity.Memory;
import lookIT.lookITspring.entity.User;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemoryCreateRequestDto {
	private Long userId;
	private List<LinePathDto> path;
}
