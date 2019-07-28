create-react-app
========

- 리액트 웹 애플리케이션 제작 환경 제공 패키지
- babel, webpack, 테스트 시스템, hmr, es6+ 문법, css 후처리기 등의 개발 환경을 구축해준다


## 구조

- index.html, index.js는 빌드시 예약 된 파일 이름
- `index.js`로부터 연결된 모든 JS 파일과 CSS 파일은 src 폴더 밑에 있어야 함
  - src 폴더 바깥에 있는 파일을 import 키워드를 이용해서 가져오려고 하면 실패
- `index.html`에서 참조하는 파일은 public 폴더 밑에 있어야 함
  - public 폴더 하에 있는 JS, CSS 파일을 script, link 태그로 가져올 수 있지만, 빌드 시 압축 등의 이점을 위해 src 폴더 밑에서 import로 사용하는 것이 좋다
  - 이미지, 폰트 파일 또한 src에서 import로 포함시 해시값을 이용하여 url을 생성하여 브라우저 캐싱 효과를 얻을 수 있음
- **SEO가 중요하다면 SSR에 특화된 next를 사용하는 것이 좋음**
- serviceWorker.js 파일에는 PWA(progressive web app)와 관련된 코드들이 존재
  - PWA: 오프라인에서도 잘 동작하는 웹 애플리케이션을 만들기 위한 기술
  - cra로 생성 시 기본적으로 꺼져 있음
  - index.js 파일에 `serviceWorker.register();` 코드를 삽입하여 기능 작동.


## 주요 명령어

### 개발 모드로 실행

`npm start`

- 개발 모드 실행 시 HMR 동작
- 브라우저 상에 에러 메시지 출력
- https 실행 옵션 제공
  - 자체 서명된 인증서 사용
  - MAC: HTTPS=true npm start
  - WINDOWS: set HTTPS=true npm start


### 빌드하기

`npm run build`

- 배포 환경에서 사용할 파일 생성
- build 폴더에 생성된다
- build/static 폴더 밑에 css, js, media 등의 파일등이 빌드됨
  - 이름에 해시값이 포함되어 생성되며, 새로 빌드를 하더라도 내용이 변경되지 않은 파일은 해시값이 같아 브라우저에 캐싱된 파일이 사용된다


### 테스트 코드 실행하기

`npm test`

- jest 테스트 프레임워크를 기반으로 한 테스트 시스템이 구축되어 있음
- cra에서는 js 파일이 다음 조건을 만족하면 테스트 파일로 인식함
  - `__tests__` 폴더 밑에 있는 모든 js 파일
  - 파일 이름이 `.test.js`로 끝나는 파일
  - 파일 이름이 `.spec.js`로 끝나는 파일


### 설정 파일 추출하기

`npm run eject`

- cra의 내부 설정 파일이 밖으로 노출되어 바벨, 웹팩 설정을 변경할 수 있음
- cra에서 개선하거나 추가된 기능이 단순히 패키지 버전을 올리는 식으로 적용되지 않는 단점이 있음


#### eject 이외의 설정 변경 방법

- `react-scripts` 프로젝트를 포크해서 나만의 스크립트 작성
- `react-app-rewired` 패키지 사용
- cra의 이후 버전에 변경된 내용을 쉽게 적용할 수 없다는 단점이 있음


## 환경 변수 사용하기

- 빌드 시점에 환경 변수를 코드로 전달할 수 있음
- 전달된 환경 변수는 코드에서 `process.env.{환경변수이름}`으로 접근 가능
- cra에서는 NODE_ENV 환경 변수를 기본으로 제공
- NODE_ENV 환경 변수 외의 다른 환경 변수는 `REACT_APP` 접두사를 붙여야 한다


### 스크립트별 NODE_ENV 환경 변수

- npm start: development
- npm test: test
- npm run build: production


### `.env` 파일을 이용한 환경 변수 관리

- 각 환경별로 다른 환경 변수를 가져야 하는 경우, 환경 변수가 많아지는 경우 별도의 .env 파일로 분리하여 관리하는 것이 좋다
- `.env.development`, `.env.test`, `.env.production` 이 대표적으로 사용되며, 그 외에도 다양한 .env 파일 생성이 가능하다