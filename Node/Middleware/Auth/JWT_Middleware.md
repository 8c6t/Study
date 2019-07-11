JWT 검증 미들웨어 만들기
========

[JWT에 대해](https://github.com/8c6t/Study/blob/master/Web/JWT.md)

## 1. 패키지 설치

```bash
npm i jsonwebtoken
```

## 2. 토큰 발급

```js
const jwt = require('jsonwebtoken');

const token = jwt.sign({
  id: user.id,
  nick: user.nick,
}, process.env.JWT_SECRET, {
  expiresIn: '1m',    // 유효기간(60 * 1000)
  issuer: 'nodebird', // 발급자
});
```
- jwt.sign(토큰 내용, 토큰 비밀키, 토큰 설정) 메소드를 사용하여 토큰 발급
- 발급한 토큰을 

## 3. 토큰 검증 미들웨어

```js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {
    // 토큰 검증 후 토큰의 내용을 req.decoded에 대입
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  // 비밀키 불일치 혹은 토큰 만료
  } catch (error) {
    if(error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
}
```
- jwt.verify(토큰, 토큰 비밀키) 메소드를 사용하여 토큰 검증
- 요청 헤더에 저장된 토큰(req.headers.authorization)을 사용
  - 사용자가 헤더에 토큰을 넣어서 전송함(`{ headers: { authorization: req.session.jwt } }`)
- req.decoded에 검증된 토큰 데이터를 추가하여 다음 미들웨어에서 사용할 수 있도록 설정
