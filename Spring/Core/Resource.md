Resource
========

- `org.springframework.core.io.Resource`
- `java.net.URL`을 추상화 한 인터페이스
- 스프링 내부에서 많이 사용되는 인터페이스
- 컨테이너 설정 정보를 담는 파일을 가져올 때도 사용


## 1. 등장 배경

- `classpath`를 기준으로 리소스를 읽어오는 기능 부재
- ServletContext를 기준으로 상대 경로로 읽어오는 기능 부재
- 새로운 핸들러를 등록하여 특별한 URL 접미사를 만들어 사용할 수는 있지만, 구현이 복잡하고 편리하지 않음


## 2. 구현체

| 구현체 | 설명 | 비고 |
|-|-|-|
| UrlResource | URL을 기준으로 리소스를 읽는 구현체 | 지원 프로토콜: http, https, ftp, file, jar |
| ClassPathResource | 클래스패스를 기준으로 리소스를 읽는 구현체 | 지원 접두어: `classpath:` |
| FileSystemResource | 파일 시스템을 기준으로 리소스를 읽는 구현체 | - |
| ServletContextResource | **웹 애플리케이션 루트에서 상대 경로로 리소스를 탐색** | 접두어가 없으면 기본으로 사용됨 |


## 3. 리소스 읽어오기

- Resource의 타입은 **location 문자열**과 **ApplicationContext의 타입**에 따라 결정됨
  - ClassPathXmlApplicationContext -> ClassPathResource
  - FileSystemXmlApplicationContext -> FileSystemRessource
  - WebApplicationContext -> ServletContextResource
- ApplicationContext의 타입에 상관없이 리소스 타입을 강제하려면 java.net.URL의 접두어들과 `classpath:` 접두어 중 하나를 사용할 수 있음
  - `classpath:...` => ClassPathResource
  - `file://...` => FileSystemResource