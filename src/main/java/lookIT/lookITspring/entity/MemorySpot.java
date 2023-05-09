package lookIT.lookITspring.entity;

import javax.persistence.*;
import java.util.Map;
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

    @EmbeddedId
    private MemorySpotId id;

    @Column(name = "memoryPhoto")
    private String memoryPhoto;
}
