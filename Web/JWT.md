
JWT
========

- JSON Web Token. 웹 표준(RFC 7519)으로 JSON 형식의 데이터를 저장하는 토큰
- **JWT 토큰 비밀키를 알지 않는 이상 변조가 불가능**
- 회원 인증, 정보 교류에 주로 사용됨
  - 외부에 노출되어도 좋은 정보에 한해 사용해야 한다
  - 클라이언트가 서버에 요청을 보낼 때마다 JWT를 포함하여 전달, 토큰을 검사함으로서 로그인 여부를 확인하기 위해 유저의 세션을 유지하지 않아도 된다(Stateful vs Stateless)

## 1. 구조

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmljayI6IjhjXzZ0IiwiaWF0IjoxNTU0ODcwOTMwLCJleHAiOjE1NTQ4NzI3MzAsImlzcyI6Im5vZGViaXJkIn0.Ox10OVQSeEyMIa1z5OiL-WBX-yAIXuIGS36cIlHzXsw`

- `.` 단위로 구분. 헤더, 페이로드, 시그니처 순

## 2. 헤더(HEADER)

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

```js
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- 토큰 종류, 해시 알고리즘 정보
- alg: 해싱 알고리즘 지정. `HMAC SHA256`이 사용됨
- typ: 토큰 타입 지정. `JWT`

## 3. 페이로드(PAYLOAD)

`eyJpZCI6MSwibmljayI6IjhjXzZ0IiwiaWF0IjoxNTU0ODcwOTMwLCJleHAiOjE1NTQ4NzI3MzAsImlzcyI6Im5vZGViaXJkIn0`

```js
{
  "id": 1,
  "nick": "8c_6t",
  "iat": 1554870930,
  "exp": 1554872730,
  "iss": "nodebird"
}
```

- 인코딩 된 토큰 내용
- 정보의 한 조각을 클레임이라 하며 크게 등록된 클레임, 공개 클레임, 비공개 클레임으로 분류

### 가. 등록된(registered) 클레임

| 키 | 본말 | 설명 |
|-|-|-|
| iss | issuer | 토큰 발급자 |
| sub | subject | 토큰 제목 |
| aud | audience | 토큰 대상자 |
| iat | issued at | 토큰 발급시간. NumericDate 형식 |
| exp | expiration | 토큰 만료시간. NumericDate 형식 |
| nbf | not before | 토큰 활성날짜. 해당 날짜가 지나기 전까지는 토큰이 처리되지 않음. NumericDate 형식 |
| jti | jwt id | 토큰에 대한 식별자 |


### 나. 공개(public) 클레임

- 충돌이 방지된 이름을 가지고 있어야 하기에 클레임 이름을 URI 형식으로 지음


### 다. 비공개(private) 클레임

- 등록된 클레임도, 공개된 클레임도 아닌, **서버와 클라이언트 간에 협의된 클레임 이름**
  - 라이브러리 이용 시 주로 비공개 클레임을 작성하게 됨
- 예제에서는 id와 nick이 해당됨
- 이름이 중복되지 않도록 주의


## 4. 시그니처(SIGNATURE)

`Ox10OVQSeEyMIa1z5OiL-WBX-yAIXuIGS36cIlHzXsw`

```js
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  토큰_비밀키
)
```

- 토큰의 변조 여부를 확인할 수 있는 일련의 문자열
- 헤더 인코딩값, 정보 인코딩값을 합친 뒤 주어진 비밀키로 해시 생성
