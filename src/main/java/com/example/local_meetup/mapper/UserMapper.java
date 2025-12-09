package com.example.local_meetup.mapper;

import com.example.local_meetup.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    /**
     * 사용자 정보 등록
     * @param user 등록할 사용자 정보
     * @return 등록된 행 수
     */
    int insertUser(User user);

    /**
     * 이메일로 사용자 조회 (중복 체크용)
     * @param email 조회할 이메일
     * @return 사용자 정보
     */
    User selectUserByEmail(String email);

}
