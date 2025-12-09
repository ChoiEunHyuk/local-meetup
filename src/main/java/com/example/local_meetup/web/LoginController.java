package com.example.local_meetup.web;

import com.example.local_meetup.domain.User;
import com.example.local_meetup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login.do")
    public String login() {
        return "loginPage";
    }

    @GetMapping("/register.do")
    public String register() {
        return "join";
    }

    @PostMapping("/insertUser.do")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> insertUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 이메일 중복 체크
            if (userService.isEmailDuplicate(user.getEmail())) {
                response.put("success", false);
                response.put("message", "이미 사용 중인 이메일입니다.");
                return ResponseEntity.ok(response);
            }

            // 회원가입 처리
            boolean result = userService.registerUser(user);

            if (result) {
                response.put("success", true);
                response.put("message", "회원가입이 완료되었습니다.");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "회원가입에 실패했습니다. 다시 시도해주세요.");
                return ResponseEntity.ok(response);
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
