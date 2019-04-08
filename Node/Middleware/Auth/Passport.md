Passport
========

- Node 진영의 범용 인증 모듈
- HTTP Basic Auth, Http digest auth, OAuth, OpenID 등 다양한 프로토콜 지원
  - 회원가입, 로그인 등 인증과 관련된 기능이 구현된 모듈
  - 이를 직접 구현하기에는 복잡한 작업이 많으므로 검증된 모델을 사용
- ≒ Spring Security

## 1. 설치

```bash
npm i passport passport-local passport-kakao bcrypt
```
- passport-local: 로그인 기능 직접 구현 시 사용
- passport-kakao: 카카오 passport 인증 구현 모듈. 이외에도 google, facebook, twitter에서 제공하는 인증 구현 모듈이 있다
- bcrypt: 키 유도 함수(Key Derivation Function) 중 비밀번호 암호화에 특화된 해시 알고리즘

### ※ bcrypt 해시 구조

`$2a$10$CoeHKxiT.D3onup2sPB7Q.Yumblsnx.urY7jTHVSlbtOzzy6hy8Ma`

- `$2a$`: 앞 4byte는 bcrypt 알고리즘을 이용한 다이제스트임을 의미
  - `$2b$`, `$2y$`도 있음
- `10$`: Cost를 의미. 2^(cost)회 반복하여 생성. 예시의 경우 2^10회
- `CoeHKxiT.D3onup2sPB7Q.`: Cost 이후 22byte는 bcrypt에 사용된 salt를 의미. 128bit를 base64 인코딩하여 22개의 문자열을 가짐
  - 해시 문자열에 salt값이 포함되므로 따로 저장하지 않아도 된다
- `Yumblsnx.urY7jTHVSlbtOzzy6hy8Ma`: salt 이후 31byte는 해시 결과값을 의미


## 2. Passport 모듈 설정

### passport/index.js
```js
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

// passport 모듈을 app.js에서 파라미터로 받음
module.exports = (passport) => {
  // 사용자 정보 객체 세션에 아이디로 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);  // 세션에 저장
  });

  // 세션에 저장한 아이디를 통해 사용자 정보 객체를 DB에서 호출
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user)) // req.user에 저장
      .catch(err => done(err));
  });

  // 인증 전략 설정
  local(passport);
  kakao(passport);
}
```

#### `serializeUser()`
- 익명 함수의 user 파라미터는 각 strategy에서 반환한 유저 정보
- req.session 객체에 어떤 데이터를 저장할지 선택

#### `deserializeUser()`
- passport.session() 미들웨어가 호출하는 메소드
- serializeUser에서 세션에 저장했던 아이디를 받아 DB에서 사용자 정보를 조회
- **조회한 정보를 req.user에 저장**

#### `done()`
- 첫번째 파라미터: 에러 발생 시 사용
- 두번째 파라미터
  - serializeUser 메소드: 세션에 저장되는 정보
  - deserializeUser 메소드: req.user에 저장되는 정보


## 3. 인증 전략 설정

### 가. 로컬 인증 전략

### passport/localStrategy.js
```js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email } });
      // DB에 유저 존재
      if(exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        // 비밀번호 일치
        if(result) {
          done(null, exUser);
        // 비밀번호 불일치
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다' });
        }
      // DB에 유저 정보 없음
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
```
- `passport.use()`: 전달 받은 Strategy 객체에 대한 인증 전략을 수립하는 메소드
- DB에 해당 유저가 존재하는지 확인 후 각각 상황에 맞는 콜백 함수 리턴
- 비밀번호는 bcrypt를 통해 암호화 되어 있기 때문에 compare 메소드를 통해 비교

#### LocalStrategy 객체

- 로컬 인증 전략 구현 객체
- 첫번째 파라미터: 전략에 관한 설정 객체. **usernameField, passwordField에 일치하는 req.body의 속성명을 적음**
- 두번째 파라미터: 실제 전략을 수행하는 **함수**
  - 첫번째 파라미터: usernameField
  - 두번째 파라미터: passwordField
  - 세번째 파라미터: passport.authenticate의 콜백 함수
    - `passport.authenticate('local', (authError, user, info))` 에서 `(authError, user, info)`에 해당


### 나. 외부 인증 전략(카카오)

### passport/kakaoStrategy.js

```js
const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    // 카카오에서 발급해주는 API ID
    clientID: process.env.KAKAO_ID,
    // 인증 결과를 받을 주소
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // 기존에 카카오로 로그인한 사용자가 있는지 검색
      const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });
      // 있으면 done 함수 호출
      if(exUser) {
        done(null, exUser);
      // 없다면 가입 진행
      } else {
        // 인증 후 받은 값을 이용하여 회원가입 진행
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        // 가입 후 done 함수 호출
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
```
- 해당 API를 제공하는 서비스 업체에서 API키 발급 및 도메인, 인증 후 리다이렉션 경로 등의 기본적인 설정이 선행되어야 한다
  - [카카오 개발자 사이트](https://developers.kakao.com/)

## 4. app 연동

### app.js

```js
...
const passport = require('passport');

// 패스포트 설정
const passportConfig = require('./passport');

// 앱 기본 설정
const app = express();
sequelize.sync();
passportConfig(passport);

...

// 미들웨어 설정
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); // express-session보다 뒤에 연결되어야 함

...
```
- `passport.initialize()`: 요청(req) 객체에 passport 설정을 심음
- `passport.session()`: req.session 객체에 passport 정보를 저장
- passport 미들웨어는 express-session 미들웨어보다 뒤에 연결되어야 함
  - req.session 객체는 express-session에서 생성하므로


## 5. 접근 권한 제어 미들웨어 생성

### routes/middlewares.js
```js
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};
```
- `req.isAuthenticated`를 이용하여 로그인 유무를 확인하는 미들웨어를 생성
  - `req.isAuthenticated`: Passport가 req 객체에 추가하는 메소드
  - true이면 로그인 중, 아니면 false


### routes/page.js

```js
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원 가입 - NodeBird',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
      user: req.user,
      loginError: req.flash('loginError'),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
```
- 접근 권한 제어 미들웨어에서 next()가 호출되어야 그 다음 미들웨어로 넘어간다
- render 메소드에 user 속성으로 req.user를 설정하여 pug에서 user객체를 통해 사용자 정보에 접근


## 6. 라우터 설정

### 가. 로컬 인증 전략

### routes/auth.js
```js
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  // request의 body에서 회원가입에 필요한 정보를 식별자에 할당
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if(exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect('/join');
    }
    // 비밀번호 해싱. 두번째 파라미터는 bcrypt cost factor
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => { 
    // 인증 오류
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    // 인증 실패 - 유저 미존재 혹은 비밀번호 오류
    if(!user) {
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    // 인증 성공
    return req.login(user, (loginError) => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);  // 미들웨어(router) 내의 미들웨어(passport)에는 (req, res, next)를 붙임
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
```
- `passport.authenticate('local')` 미들웨어가 로컬 로그인 전략 수행
  - 미들웨어가 라우터 미들웨어 안에 존재. 미들웨어에 사용자 정의 기능을 추가하고 싶을 때 사용
  - **내부 미들웨어에 (req, res, next)를 인자로 제공해서 호출**
- **Passport는 req 객체에 login과 logout 메소드를 추가시킴**
  - `req.login`: **passport.serializeUser 호출**. req.login에 제공하는 user 객체가 serializeUser로 넘어감
  - `req.logout`: req.user 객체 제거
  - `req.session.destroy`: req.session 객체의 내용 제거


### 나. 외부 인증 전략(카카오)

### routes/auth.js
```js
// 카카오 인증 전략
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});
```
- **GET /auth/kakao** 경로로 접근 시 카카오 로그인 과정 시작
- 카카오 로그인 창으로 리다이렉트, 결과를 **GET /auth/kakao/callback**으로 받음
- `passport.authenticate` 메소드에 콜백 함수를 제공하지 않음
  - **내부적으로 req.login을 호출**하기 때문에 직접 호출할 필요가 없음


## 7. 인증 흐름

### 가. 전체 과정

1. 로그인 요청
2. passport.authenticate 메소드 호출
3. 로그인 전략 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5. req.login 메소드가 passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료

### 나. 로그인 이후 과정

1. 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메소드 호출
2. req.session에 저장된 아이디로 DB 사용자 조회
3. 조회된 사용자 정보를 req.user에 저장
4. 라우터에서 req.user 객체 사용 가능

--------
> 1. [passport 공식 문서](http://www.passportjs.org/docs/)<br>
> 2. [passport 인증 모킹 - Outsider님 블로그](https://blog.outsider.ne.kr/909)