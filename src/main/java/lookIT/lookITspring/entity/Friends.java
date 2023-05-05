package lookIT.lookITspring.entity;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Friends {
  @Id
  @NotNull
  private Integer friendID;
  @NotNull
  private String uesrID;
  @NotNull
  private String status;

}
