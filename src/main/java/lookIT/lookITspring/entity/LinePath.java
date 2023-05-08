package lookIT.lookITspring.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "linePath")
public class LinePath {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long linePathId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Long memoryId;

	@Column
	private Double latitude;

	@Column
	private Double longitude;
}
