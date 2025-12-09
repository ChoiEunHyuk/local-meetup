package com.example.local_meetup.service;

import com.example.local_meetup.domain.User;

public interface UserService {

    /**
     * 사용자 회원가입
     * @param user 등록할 사용자 정보
     * @return 등록 성공 여부
     */
    boolean registerUser(User user);

    /**
     * 이메일 중복 확인
     * @param email 확인할 이메일
     * @return 중복 여부 (true: 중복, false: 사용 가능)
     */
    boolean isEmailDuplicate(String email);

}
