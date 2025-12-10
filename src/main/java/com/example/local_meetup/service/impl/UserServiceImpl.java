package com.example.local_meetup.service.impl;

import com.example.local_meetup.domain.User;
import com.example.local_meetup.mapper.UserMapper;
import com.example.local_meetup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public boolean registerUser(User user) {
        try {
            // 이메일 중복 체크
            if (isEmailDuplicate(user.getEmail())) {
                return false;
            }

            // BCrypt를 사용한 비밀번호 암호화
            // BCrypt는 자체적으로 랜덤 salt를 생성하고 관리합니다
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            // 사용자 등록
            int result = userMapper.insertUser(user);
            return result > 0;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean isEmailDuplicate(String email) {
        User existingUser = userMapper.selectUserByEmail(email);
        return existingUser != null;
    }

    @Override
    public User authenticateUser(String email, String rawPassword) {
        try {
            // 이메일로 사용자 조회
            User user = userMapper.selectUserByEmail(email);

            // 사용자가 존재하지 않으면 null 반환
            if (user == null) {
                return null;
            }

            // BCrypt로 비밀번호 검증
            // passwordEncoder.matches()는 rawPassword를 암호화하여 저장된 해시와 비교합니다
            boolean isPasswordMatch = passwordEncoder.matches(rawPassword, user.getPassword());

            // 비밀번호가 일치하면 사용자 정보 반환, 일치하지 않으면 null 반환
            if (isPasswordMatch) {
                return user;
            } else {
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
