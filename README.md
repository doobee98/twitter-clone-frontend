# Twitter-Clone-Frontend

![Support TypeScript](https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript) ![Support TypeScript](https://img.shields.io/static/v1.svg?label=&message=Redux&color=764ABC&style=flat-square&logo=redux) ![Support TypeScript](https://img.shields.io/static/v1.svg?label=&message=React&color=294E80&style=flat-square&logo=react) 


This project is a frontend term project of COSE490 (Korea Univ.).

You can directly use our frontend application at [https://doobee98.github.io/twitter-clone-frontend](https://doobee98.github.io/twitter-clone-frontend).

You can also check our [Twitter-Clone-Backend](https://github.com/doobee98/twitter-clone-backend) project.

## Participants

* [@2doo](https://github.com/doobee98)
* [@calvin0627](https://github.com/calvin0627)
* [@JJGwan926](https://github.com/JJGwan926)

## Documents

* [Github Wiki](https://github.com/doobee98/twitter-clone-frontend/wiki)

## Clone and Run

### core packages

- styled components
- react-redux

### local mode

```bash
$ git clone https://github.com/doobee98/twitter-clone-frontend.git .
$ yarn install
$ yarn start
```

## Pages, Features

### Page Template

- navigationBar
  - Homepage, Profilepage 라우팅
- Page Header
- searchBar
  - 이름이나 아이디 통한 user 검색, 검색 결과 클릭시 해당 유저의 프로필 페이지로 이동

### LoginPage

사진

- Sign Up / Sign In

### HomePage

사진

- create Tweet
  - set Reply Permission
- Tweet actions
  - Retweet
  - Like
  - Reply
- Follow / UnFollow
- Profile Information
  - 유저 이름, 프로필 사진에 hover시 해당 유저의 profile information description 툴팁

### ProfilePage

사진

- User Information
  - 이름
  - 아이디
  - biography
  - location
  - website
  - joined date
- User Information edit
  - 이름, biography, location, website 정보 변경 가능

### NotImplementedPage

사진

- 아직 개발되지 않은 페이지 라우팅시 등장

