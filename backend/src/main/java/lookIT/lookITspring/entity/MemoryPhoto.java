package lookIT.lookITspring.entity;

import javax.persistence.*;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
public class MemoryPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memoryPhotoId;

    @Column
    private String memoryPhoto;

    @Column
    private String memoryPhotoKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spotId", nullable = false)
    private MemorySpot memorySpot;
}
