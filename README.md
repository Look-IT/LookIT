# LookIT - 추억일지

![Logo](https://github.com/Look-IT/LookIT/assets/48748249/2b67275c-4898-4e40-b4ed-a5e28e02a67c)

## **팀원**
| 이름 | 학번 | 담당 |
| ------ | ------ | ------ |
|   김효진     |    20학번  |    백엔드, 팀장        |
|   임민호    |    19학번  |    프론트엔드, 디자인       |
|   신호근     |    15학번  |    프론트엔드        |
|   장희지|    20학번  |    백엔드        |
|   최준호    |    18학번  |    백엔드      |

<br>

## **목차**

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [소프트웨어 아키텍처 및 알고리즘](#소프트웨어-아키텍처-및-알고리즘)
4. [앱 기능 설명](#앱-기능-설명)
5. [활용 기술](#활용-기술)

<br>

## **프로젝트 소개**

* 이 프로젝트는 아주대학교 캡스톤디자인 과목의 프로젝트를 위해 작성됨

* 본 프로젝트는 아주대학교 SW캡스톤디자인 프로젝트로, 모바일 애플리케이션을 기획함

* 인스타그램, 페이스북 등 SNS 성격을 띈 서비스의 증가 트렌드에 따라, 친구 및 지인 간 소통은 서비스의 가장 중요한 부분이 됨

* 또한, 친구들과의 추억을 SNS에 게시하여 기록하고 사회성을 과시하는 경우가 많음

* 이에 따라 SNS를 결합하여 일상의 추억을 기록할 수 있는 '**추억일지**'를 기획함


<br>

## **기술스택**

* 이 프로젝트는 아래의 환경을 구성하여 구현함

| 분야  | 사용 |
| ------ | ----- |
|   프론트엔드  | React Native |  
|   백엔드    |    Spring Boot  |    
| 서버 |  Cloud Type |

<br>

![기술스택](https://github.com/Look-IT/LookIT/assets/48748249/1c14653b-184d-4219-977d-b8ba8552c111)


<br>

## **소프트웨어 아키텍처 및 알고리즘**
<br>

![아키텍쳐](https://github.com/Look-IT/LookIT/assets/48748249/ab76170e-3566-4b1f-8dd7-22d690299647)

<br>

## **핵심 기능**

### 1. 추억일지 생성 / 조회
	- 사용자의 경로 추적
	- 생성된 추억일지에 마커 생성
	- 마커에 촬영한 사진 맵핑
	- 내가 생성한 추억일지 및 친구의 추억일지 조회

### 2. 추억네컷 생성 / 조회
	- 지정된 랜드마크 근처에서 추억네컷 생성 가능
	- 해당 랜드마크에서 제공하는 네컷 프레임 사용 가능
	- 8장 촬영 후 4장 사진 선택 가능
	- 프레임 배치 순서 선택
	- 내가 생성한 추억네컷 및 내가 태그된 추억네컷 조회

### 3. 친구 설정 및 태그
	- 친구 요청 및 수락
	- 추억네컷에 친구태그
	- 추억일지에 장소에 대한 정보태그
	- 정보태그 기반 추억일지 검색

<br>

## **활용 기술**


### S3
![스크린샷 2023-06-02 222857](https://github.com/Look-IT/LookIT/assets/76723045/4e155b2c-0869-49f6-b687-6e7ff5bb11db)

- **추억일지 내 마커에 업로드된 사진** 및 랜드마크의 **네컷 프레임**, 사용자의 **추억네컷**을 AWS S3에 저장함


<br>

### Naver Map API

![Naver Map API](https://github.com/Look-IT/LookIT/assets/48748249/09c16873-e213-48a9-8fb0-745eb8aa0d92)

| 사용명 | 특징 |
|--|--|
| 경로 추적 | - 사용자가 원할 때 경로를 추적함 <br> - 추적한 경로를 지도 상에 표현함  |
| 마커 표현 | - 자체적인 커스텀 마커 맵핑함 <br> - 마커별 상세 정보 표현함 |