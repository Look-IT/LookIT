package lookIT.lookITspring.entity;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class MemoryPhoto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memoryPhotoId;

    @Column
    private String memoryPhoto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spotId", nullable = false)
    private MemorySpot memorySpot;
}
