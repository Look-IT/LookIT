package lookIT.lookITspring.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lookIT.lookITspring.entity.Member;

@Data
@Builder
@AllArgsConstructor
public class MemberSignUpRequestDto {

	@NotBlank(message = "아이디 입력해주세요.")
	@Size(min=2, message = "아이디가 너무 짧습니다.")
	private String tagName;

	@NotBlank(message = "이메일을 입력해주세요.")
	private String email;

	@NotBlank(message = "비밀번호를 입력해주세요")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}$",
		message = "비밀번호는 8~30 자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.")
	private String password;

	@NotBlank(message = "닉네임을 입력해주세요.")
	@Size(min=2, message = "닉네임이 너무 짧습니다.")
	private String nickName;

	@Builder
	public Member toEntity(){
		return Member.builder()
			.tagName(tagName)
			.email(email)
			.password(password)
			.nickName(nickName)
			.build();
	}
}
