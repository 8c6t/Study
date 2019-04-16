Socket.IO
========

- 웹 소켓을 편하게 사용할 수 있는 자바스크립트 라이브러리
- 웹 소켓이 지원되지 않는 브라우저의 경우 폴링 방식을 이용함

> [웹소켓과 Socket.IO](https://d2.naver.com/helloworld/1336)


## 1. 설치

```bash
npm i socket.io
```

## 2. 서버 연결

### socket.js
```js
const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, { path:'/socket.io' });
}
```

- `SocketIO(param1, param2)`
  - param1: 연결할 서버 객체
  - param2: 옵션 객체
    - `path`: 클라이언트와 연결할 수 있는 경로

### app.js

```js
const webSocket = require('./socket');

...

const port = app.get('port');
const server = app.listen(port, () => {
  console.log(`${port}번 포트에서 대기 중`);
});

// 익스프레스 서버와 웹소켓 서버 연결
webSocket(server);
```


## 3. 이벤트 리스너 설정

### 서버 - socket.js
```js
io.on('connection', (socket) => {
  const req = socket.request;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);

  socket.on('disconnect', () => {
    console.log('클라이언트 접속 해제', ip, socket.id);
    clearInterval(socket.interval);
  });

  // 직접 만든 이벤트
  socket.on('reply', (data) => {
    console.log(data);
  });
  
  socket.on('error', (err) => {
    console.error(err);
  });

  socket.interval = setInterval(() => {
    socket.emit('news', 'Hello Socket.IO');
  }, 3000);
});
```

- 웹소켓은 이벤트 기반. 각각의 이벤트가 발생했을 경우 수행할 함수를 등록
- `socket.request`: 요청 객체에 접근 가능
- `socket.request.res`: 응답 객체에 접근 가능
- `socket.id`: 소켓 고유의 아이디
- `socket.emit(param1, param2)`: 클라이언트에 메시지 전송
  - param1: 이벤트 이름
  - param2: 데이터


### 클라이언트

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect("http://localhost:8005", {
    path: "/socket.io",
    // 폴링 방식을 제외하고 웹소켓만 사용하는 경우
    transports: ["websocket"]
  });

  socket.on("news", function(data) {
    console.log(data);
    socket.emit("reply", "Hello Node.JS");
  });
</script>
```

- ws 프로토콜이 아닌 http 프로토콜을 사용
  - 최초 서버 연결을 폴링 방식으로 진행
  - 폴링 연결 후 웹 소켓을 사용할 수 있다면 웹 소켓으로 업그레이드
  - 처음부터 웹 소켓만 사용할 경우 옵션에 `transports: ['websocket']` 추가
- **path 옵션이 서버의 path와 일치하여야 함**


## 4. 네임스페이스와 방

### 서버 - socket.js
```js
module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  // 라우터에서 io 객체를 사용할 수 있도록 설정(req.app.get('io'))
  app.set('io', io);

  // of(): socket.io에 네임스페이스 부여
  const room = io.of('/room');
  const chat = io.of('/chat');

  // io.use 메소드에 미들웨어 장착
  io.use((socket, next) => {
    // 미들웨어이므로 (req, res, next)를 파라미터로 전달
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  // room 네임스페이스에 이벤트 리스너 설정
  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  })

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');

    socket.join(roomId);

    // 
    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다`,
    });

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId);
    });

    const currentRoom = socket.adapter.rooms[roomId];

  });
}
```
### 네임스페이스

- 일종의 **엔드포인트** 혹은 **경로**로를 의미
- **같은 네임스페이스끼리만 데이터를 전달**
- 기본적으로 `/` 네임스페이스에 접속
- `io.of(param)`: Socket.IO에 네임스페이스를 부여
- 각각의 네임스페이스에 대해 이벤트 리스너 설정 진행

### 방(Room)

- 네임스페이스보다 더 세부적인 개념으로, 같은 네임스페이스 안에서도 같은 방에 있는 소켓끼리만 통신 가능
- 같은 네임스페이스 + 같은 방에 있는 소켓끼리만 데이터를 주고받음
- `socket.join(param)`: 각 네임스페이스 내에 param 이름의 방(room)을 생성
- `socket.leave(param)`: param에 해당하는 방을 나옴
- `socket.to(param)`: param 값의 방으로 데이터 전송
  - param값이 소켓 아이디라면 해당 소켓 아이디로만 데이터를 전송
- `socket.adapter.rooms[param]`: param 값의 방에 참여 중인 소켓 정보


#### ※ SocketIO 내에서 미들웨어 사용

- app.js에서 라우터 미들웨어 객체(app), 세션 미들웨어 객체를 파라미터로 전달
- `app.set('io', io)`: 라우터에서 io 객체를 사용할 수 있도록 설정
  - socket 연결 시 라우터 객체를 파라미터로 같이 전달
  - 라우터에서 `req.app.get('io')`로 io 객체에 접근 가능


#### ※ `socket.broadcast`

- 나를 제외한 나머지 사람에게 데이터 전송시 사용
- `socket.broadcast.emit(param1, param2)`
- `socket.broadcast.to().emit(param1, param2)`


> [socket.io 네임스페이스와 방](https://socket.io/docs/rooms-and-namespaces/)



### 클라이언트

```js
var namespace = 'room';
var socket = io.connect(`http://localhost:8005/${namespace}`, {
  path: "/socket.io",
  // 폴링 방식을 제외하고 웹소켓만 사용하는 경우
  transports: ["websocket"]
});
```
- 주소 뒤에 네임스페이스를 붙임
