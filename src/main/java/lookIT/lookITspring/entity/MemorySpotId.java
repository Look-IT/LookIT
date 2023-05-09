package lookIT.lookITspring.entity;


import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;


@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemorySpotId implements Serializable {

    @Column(name = "spotLatitude")
    private Double spotLatitude;

    @Column(name = "spotLongitude")
    private Double spotLongitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memoryId", nullable = false)
    private Memory memory;
}
