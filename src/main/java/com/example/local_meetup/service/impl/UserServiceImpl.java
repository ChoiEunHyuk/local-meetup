package com.example.local_meetup.service.impl;

import com.example.local_meetup.domain.User;
import com.example.local_meetup.mapper.UserMapper;
import com.example.local_meetup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public boolean registerUser(User user) {
        try {
            // 이메일 중복 체크
            if (isEmailDuplicate(user.getEmail())) {
                return false;
            }

            // 비밀번호 암호화는 추후 BCrypt 적용 예정
            // String encodedPassword = passwordEncoder.encode(user.getPassword());
            // user.setPassword(encodedPassword);

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

}
