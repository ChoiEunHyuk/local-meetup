# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a local community meetup platform (동네 소모임 게시판) built with Spring Boot. The application allows users to create and join local meetups in their area with features for user management, group creation, participation requests, and comments.

## Technology Stack

- **JDK:** OpenJDK 17
- **Spring Boot:** 3.5.3
- **Build Tool:** Maven
- **Template Engine:** Thymeleaf
- **Database:** Oracle (MyBatis for data access)
- **Additional Libraries:** proj4j (geographic projections)

## Build and Run Commands

### Build the project
```bash
./mvnw clean install
```

### Run the application
```bash
./mvnw spring-boot:run
```

The application will start on the default Spring Boot port (8080).

### Run tests
```bash
./mvnw test
```

### Run a single test class
```bash
./mvnw test -Dtest=LocalMeetupApplicationTests
```

### Package the application
```bash
./mvnw package
```

## Architecture

### Package Structure

The application follows a standard Spring MVC layered architecture:

- **`com.example.local_meetup`** - Root package containing the main application class
- **`com.example.local_meetup.web`** - Controllers (presentation layer) - handles HTTP requests
- **`com.example.local_meetup.service`** - Service layer (business logic)
- **`com.example.local_meetup.service.impl`** - Service implementations
- **Template files** - Located in `src/main/resources/templates/` (Thymeleaf HTML views)

### Expected Architecture (based on README)

The application is designed to follow a Controller-Service-Repository pattern:

- **Controllers** - Handle HTTP requests, return view names for Thymeleaf rendering
- **Services** - Business logic layer
- **Repository/DAO** - Data access layer using MyBatis for dynamic SQL queries
- **Models/DTOs** - Domain objects representing database entities

### URL Mapping Convention

Controllers use `.do` suffix for URL mappings (e.g., `/login.do`), which is a traditional Java web application convention.

### Database Schema

The application uses the following main tables:

- **`users`** - User accounts (email, password, nickname, region)
- **`groups`** - Meetup posts (title, content, region, max_members, status)
- **`group_members`** - Participation requests and memberships (status: 대기중/수락/거절)
- **`group_comments`** - Comments on meetup posts
- **`group_categories`** - Optional categories for meetups (운동, 공부, 게임 등)

Key relationships:
- Groups are owned by users (host)
- Group members link users to groups with approval status
- Comments belong to both a group and a user

### Key Features to Implement

1. **User Management** - Registration, login/logout, profile updates, account deletion
2. **Meetup Board** - CRUD operations with pagination and filtering by region/category
3. **Comments** - Add/edit/delete comments on meetup posts
4. **Participation System** - Request to join, host approval/rejection, member list
5. **UI Pages** - Home (meetup list), login/registration, my meetups (hosted and joined)

### Security Considerations

- Password encryption should use BCrypt or similar
- Session-based authentication is expected
- Authorization checks: only post authors can edit/delete their posts
- Validation of user inputs is required

## Development Notes

- MyBatis will be used for database access with dynamic SQL and JOIN queries
- Thymeleaf is configured for server-side HTML rendering
- JavaScript should be used for client-side features like region filters, dynamic comment loading, and pagination
- The architecture emphasizes RESTful API design principles
