package com.example.local_meetup.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login.do")
    public String login() {
        return "loginPage";
    }

}
