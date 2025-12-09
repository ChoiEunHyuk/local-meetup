package com.example.local_meetup.domain;

import java.time.LocalDateTime;

public class User {
    private Integer userId;
    private String email;
    private String password;
    private String nickname;
    private String region;
    private LocalDateTime createdDt;

    // 기본 생성자
    public User() {
    }

    // 전체 생성자
    public User(Integer userId, String email, String password, String nickname, String region, LocalDateTime createdDt) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.region = region;
        this.createdDt = createdDt;
    }

    // Getter & Setter
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public LocalDateTime getCreatedDt() {
        return createdDt;
    }

    public void setCreatedDt(LocalDateTime createdDt) {
        this.createdDt = createdDt;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", region='" + region + '\'' +
                ", createdDt=" + createdDt +
                '}';
    }
}
