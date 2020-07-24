REST
========

- REpresentational State Transfer
- WWW와 같은 분산 하이퍼미디어 시스템에서 운영되는 소프트웨어 아키텍처 스타일
- HTTP 프로토콜을 정확히 의도에 맞게 활용하여 디자인하게 유도
  - 기존 웹 기술과 HTTP 프로토콜을 그대로 활용하기 때문에, 웹의 장점을 최대한 활용할 수 있는 아키텍처
- HTTP URI를 통해 자원을 명시하고, HTTP Method를 통해 해당 자원에 대한 CRUD 작업을 적용

## REST 구성 요소

### 자원(Resource)

- URI
- 모든 자원에 고유한 ID가 존재하고, 이 자원은 서버에 존재함
- 클라이언트는 URI를 이용하여 자원을 지정하고, 해당 자원의 상태(정보)에 대한 조작을 서버에 요청


### 행위(Verb)

- HTTP 프로토콜의 Method를 활용
- GET, POST, PUT, DELETE 등의 HTTP Method를 CRUD에 대응시켜 작업

### 표현(Representations)

- 클라이언트가 자원의 상태에 대한 조작을 요청하면 서버는 이에 적절한 응답(Representation)을 보냄
- JSON, XML, TEXT 등


## REST 특징

### Client-Server

- 서버 측은 API를 제공, 클라이언트는 사용자 인증이나 컨텍스트 등을 직접 관리하는 구조
- 각각 역할이 구분되기 때문에 개발 내용이 명확해지고, 서로간의 의존성이 줄어듬


### Stateless

- 클라이언트의 컨텍스트를 서버측에 보관하지 않음
- 세션 정보나 쿠키 정보를 별도로 저장하고 관리하지 않기 때문에 API 서버는 들어오는 요청만을 단순히 처리하면 됨
- 서버 측은 각각의 요청을 완전히 별개의 것으로 인식하고 처리


### Cacheable

- HTTP 프로토콜을 그대로 사용하기 때문에, HTTP의 캐싱 기능을 그대로 적용할 수 있음
- Last-Modified 태그나 E-Tag를 활용


### Uniform Interface

- URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일
- HTTP 표준 프로토콜을 따르는 모든 플랫폼에 적용이 가능하므로 특정 언어나 기술에 종속되지 않음
- Identification of resources: 자원은 유일하게 식별 가능해야 함
- manipulation of resources through representations: HTTP Method로 표현을 담아야 함
- self-descriptive: 메시지 스스로 메시지에 대한 설명 이 가능해야 함
  - 확장 가능한 커뮤니케이션
- HATEOAS: 하이퍼링크를 통해서 애플리케이션의 상태 변화가 가능해야 함
  - Versioning 없이 링크 정보를 동적으로 바꿀 수 있음


### Layered System

- REST 서버는 다중 계층으로 구성될 수 있음
- 보안, 로드 밸런싱, 암호화, 사용자 인증 계층을 추가하여 구조상의 유연성을 가질 수 있음


### Code-On-Demand (Optional)

- 서버로부터 스크립트를 받아서 클라이언트에서 실행
- 반드시 충족할 필요는 없음


## RESTful

- 위의 REST 특징을 모두 만족할 때 RESTful 하다고 할 수 있다
- 일관적인 컨벤션을 통한 API의 이해도 및 호환성을 높이는 것이 주 목적


## REST API

- API: 응용 프로그램 간 상호 작용을 하기 위한 인터페이스 사양
- REST 기반으로 서비스 API를 구현한 것
- RESTful API는 REST 특징을 만족하는 API를 말한다


### REST API 디자인 가이드

1. URI는 자원을 대표해야 함
2. Resource에 대한 행위는 HTTP Method로 표현함

### URI 설계 유의사항

1. 슬래시 구분자(`/`)는 계층 관계를 나타내는 데 사용
2. URI의 마지막 문자로 슬래시(`/`)를 포함하지 않음
3. 하이픈(`-`)은 URI 가독성을 높이는데 사용
4. 밑줄(`_`)은 URI에 사용하지 않음
5. URI 경로에는 소문자가 적합
6. 파일 확장자는 URI에 포함시키지 않음. Accept-Header를 사용
