package lookIT.lookITspring.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllLandmarkDto {

    private Long landmarkId;

    private Double landLatitude;

    private Double landLongitude;

}

