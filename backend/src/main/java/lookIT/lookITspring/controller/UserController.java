package lookIT.lookITspring.controller;

import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.dto.UserJoinRequestDto;
import lookIT.lookITspring.entity.User;
import lookIT.lookITspring.repository.UserRepository;
import lookIT.lookITspring.security.JwtProvider;
import lookIT.lookITspring.service.EmailService;
import lookIT.lookITspring.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
public class UserController {

    private final UserService userService;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @PostMapping("/join")
    @ResponseStatus(HttpStatus.OK)
    public boolean join(@Valid @RequestBody UserJoinRequestDto request) throws Exception {
        return userService.join(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> member) {
        return userService.login(member);
    }

    @GetMapping("/join/exists")
    public ResponseEntity<Boolean> checkIdDuplicate(@RequestParam("tagId") String tagId) {
        return ResponseEntity.ok(userService.checkIdDuplicate(tagId));
    }

    @DeleteMapping("/logout")
    public boolean logout(@RequestBody Map<String, String> request) {
        return userService.logout(request.get("token"));
    }

    @PostMapping("/emailConfirm")
    public String emailConfirm(@RequestParam String email) throws Exception {
        try {
            User user = userRepository.findByEmail(email).get();
        } catch (Exception e) {
            return "해당 이메일로 가입된 유저가 없습니다.";
        }

        String confirm = emailService.sendSimpleMessage(email);
        return confirm;
    }

    @PostMapping("/findPassword")
    public boolean regeneratePassword(@RequestBody Map<String, String> request) {
        return userService.regeneratePassword(request);
    }

    @PostMapping("/emailConfirmJoin")
    public String emailConfirmJoin(@RequestParam String email) throws Exception {
        String confirm = emailService.sendSimpleMessage2(email);
        return confirm;
    }
}