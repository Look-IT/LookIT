package lookIT.lookITspring.entity;

import javax.persistence.Column;
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
@Table(name = "PhotoTags")
public class PhotoTags {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tagId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "friendId")
	private User friend;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "photo4CutId")
	private Collections collections;
}