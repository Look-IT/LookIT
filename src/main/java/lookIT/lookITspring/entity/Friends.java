package lookIT.lookITspring.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Friends {
  @Id
  @NotNull
  private Integer friendId;
  @NotNull
  private String uesrId;
  @NotNull
  private String status;

}
