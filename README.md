# 동네 소모임 게시판 (로컬 커뮤니티 플랫폼)
## 개발 환경

이 프로젝트는 다음 환경에서 개발되었습니다.

- **OPEN JDK:** 17
- **Spring Boot:** 3.5.4
- **TYPE:** Maven
- **Apache Tomcat:** 9.x
- **DB:** ORACLE


## 기능 설계 (기능 목록)
### 1. 회원 기능

- 회원가입 / 로그인 / 로그아웃
- 사용자 정보 수정 (닉네임, 비밀번호 등)
- 탈퇴

### 2. 소모임 게시판 기능

- 소모임 글 등록 (모임명, 내용, 지역, 인원 등)
- 글 목록 조회 (페이징, 지역/카테고리 필터링)
- 글 상세보기
- 글 수정 / 삭제 (작성자만 가능)

### 3. 댓글 기능

- 댓글 등록 / 수정 / 삭제
- 대댓글 (선택사항)

### 4. 참여 기능 (신청 & 수락)

- 소모임 참여 신청
- 호스트가 신청자 수락 or 거절
- 참여 인원 목록 조회

### 5. 기본 UI 페이지

- 홈(소모임 목록)
- 로그인 / 회원가입
- 내 소모임 관리 (내가 개설한 / 내가 참여한 소모임)

## 테이블 설계 (ERD)

### 테이블 목록

- `users`
- `groups`
- `group_members`
- `group_comments`
- *(선택)* `group_categories`

---

### `users` (회원)

| 컬럼명 | 타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| user_id | INT | PK, AI | 사용자 ID |
| email | VARCHAR(100) | UNIQUE, NOT NULL | 로그인용 이메일 |
| password | VARCHAR(255) | NOT NULL | 비밀번호 (암호화 저장) |
| nickname | VARCHAR(50) | NOT NULL | 닉네임 |
| region | VARCHAR(100) | NULL | 거주 지역 |
| created_at | DATETIME | DEFAULT now() | 가입일 |

---

### `groups` (소모임 게시글)

| 컬럼명 | 타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| group_id | INT | PK, AI | 소모임 ID |
| user_id | INT | FK → users(user_id) | 작성자 |
| title | VARCHAR(100) | NOT NULL | 모임 제목 |
| content | TEXT | NOT NULL | 상세 설명 |
| region | VARCHAR(100) | NOT NULL | 활동 지역 |
| max_members | INT | NOT NULL | 최대 인원 수 |
| status | VARCHAR(20) | DEFAULT '모집중' | 모집 상태 (모집중, 마감) |
| created_at | DATETIME | DEFAULT now() | 작성일 |

---

### `group_members` (소모임 참가)

| 컬럼명 | 타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| group_member_id | INT | PK, AI | 참가 ID |
| group_id | INT | FK → groups(group_id) | 소모임 ID |
| user_id | INT | FK → users(user_id) | 신청자 |
| status | VARCHAR(20) | DEFAULT '대기중' | 신청 상태 ('대기중', '수락', '거절') |
| joined_at | DATETIME | NULL | 수락된 날짜 |

---

### `group_comments` (댓글)

| 컬럼명 | 타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| comment_id | INT | PK, AI | 댓글 ID |
| group_id | INT | FK → groups(group_id) | 소모임 ID |
| user_id | INT | FK → users(user_id) | 댓글 작성자 |
| content | TEXT | NOT NULL | 댓글 내용 |
| created_at | DATETIME | DEFAULT now() | 작성일 |

---

### *(선택)* `group_categories` (카테고리: 운동, 공부, 게임 등)

| 컬럼명 | 타입 | 제약조건 | 설명 |
| --- | --- | --- | --- |
| category_id | INT | PK, AI | 카테고리 ID |
| name | VARCHAR(50) | UNIQUE, NOT NULL | 카테고리명 |

> 그리고 groups에 category_id를 FK로 추가하면 됩니다.
> 

---

## 기술적 어필 포인트

- **MyBatis**: 동적 쿼리, JOIN 활용
- **Java (Spring)**: MVC 구조 설계 + 유효성 검증
- **JavaScript**: 지역 필터, 댓글 동적 로딩, 페이징 처리
- **보안**: 비밀번호 암호화 (BCrypt 등), 세션 관리
- **구조적 설계**: RESTful API + Controller-Service-Repository 구조
