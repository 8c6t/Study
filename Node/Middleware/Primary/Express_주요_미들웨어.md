## morgan

```bash
npm i morgan
```

```js
const morgan = require('morgan');

if(process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
```
- 콘솔 기록 미들웨어
- 파라미터로 dev 대신 short, common, combined을 사용하여 로그 출력 옵션 변경 가능
  - 개발 환경: short, dev
  - 배포 환경: common, combined


## static

```js
app.use(express.static(path.join(__dirname, 'public')));
```
- express 내장 미들웨어
- 정적 파일 제공 미들웨어
- 정적 파일 라우터 기능을 수행하므로 위쪽에 배치

```js
app.use('/img', express.static(path.join(__dirname, 'uploads')));
```
- 정적 파일 제공 주소 지정 가능


## body-parser

```bash
npm i body-parser
```

```js
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.raw());
app.use(bodyParser.text());
```

- 요청의 본문을 해석해주는 미들웨어
- **해석한 데이터를 req.body에 추가**

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

- 익스프레스 4.16.0 버전부터 body-parser의 일부 기능이 익스프레스에 내장됨


### body-parser 미들웨어 해석 종류

- json: JSON 데이터 해석
- urlencoded: 주소 형식으로 전송된 데이터 해석
  - extended 옵션이 false이면 노드의 querystring 모듈을 사용하여 쿼리스트링 해석
  - true이면 qs모듈을 사용하여 쿼리스트링 해석
- raw: 버퍼 데이터 해석
- text: 텍스트 데이터 해석


## cookie-parser

```js
const cookieParser = require('cookie-parser');

app.use(cookieParser(process.env.COOKIE_SECRET));
```

- 쿠키 해석 미들웨어
- 해석한 쿠키를 req.cookies 객체에 추가
- 문자열 파라미터 설정 시 해당 문자열(비밀키)로 쿠키를 서명함
  - 서명된 쿠키는 클라이언트에서 수정했을 때 에러 발생


## express-session

```bash 
npm i express-session
```

```js
const session = require('express-session');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
```

- 세션 구현 미들웨어
- 가급적 cookie-parser 미들웨어 뒤에 위치
- req.session 객체를 추가함
- 세션에 대한 설정을 파라미터로 받음

### 세션 설정 옵션

- resave: 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 여부. false 권장
- saveUninitialized: 세션에 저장할 내역이 없더라도 세션을 저장할지 여부. 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장. 주로 방문자 추적 시 사용
- secret: 필수 항목. cookie-parser의 비밀키와 같은 역할
  - 세션 관리 시 쿨라이언트에 쿠키를 전송(세션 쿠키)하므로
- cookie: 세션 쿠키에 대한 설정
  - expires, maxAge, domain, path, sameSite, httpOnly, secure 등...
- store: 세션을 DB를 연결


### 세션 쿠키 설정 옵션

- expires: 만료 기한. 이 기한이 지나면 쿠키가 제거됨. 기본값은 클라이언트 종료시까지
- maxAge: 만료 기한. 날짜 대신 초를 입력. Expires와 같이 사용하는 경우 마지막에 선언된 것이 사용됨.
- domain: 쿠키가 전송될 도메인을 특정. 기본값은 현재 도메인
- path: 쿠키가 전송될 URL 특정. 기본값은 '/'이고 이 경우 모든 URL에서 쿠키를 전송할 수 있음.
- httpOnly: 설정 시 자바스크립트에서 쿠키에 접근할 수 없음. 쿠키 조작 방지를 위해 설정하는 것이 좋음
- secure: HTTPS일 경우에만 쿠키가 전송됨


## flash

```bash
npm i connect-flash
```

```js
const flash = require('connect-flash');

app.use(flash());
```

- 일회성 메시지들을 이용해야 하는 경우 사용하는 미들웨어
- cookie-parser, express-session을 사용하므로 이들보다 뒤에 위치해야 함
- req 객체에 req.flash 메소드를 추가함
  - req.flash(키, 값)으로 해당 키에 값을 설정
  - req.flash(키)로 해당 키에 대한 값을 불러옴