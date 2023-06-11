package lookIT.lookITspring.entity;

import javax.persistence.*;

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
@Table(name = "MemorySpot")
public class MemorySpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long spotId;

    @Column(name = "spotLatitude")
    private Double spotLatitude;

    @Column(name = "spotLongitude")
    private Double spotLongitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memoryId", nullable = false)
    private Memory memory;
}
