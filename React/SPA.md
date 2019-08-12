SPA
========

- Single Page Application
- 최초 요청 시 서버에서 첫 페이지를 처리하고 이후의 라우팅은 클라이언트에서 처리하는 웹 애플리케이션
- 페이지 전환에 의한 렌더링을 클라이언트에서 처리
- 구현을 위해서는 브라우저 히스토리 API가 필요


## SPA 구현을 위해 필요한 기능

- 자바스크립트에서 브라우저로 페이지 전환 요청을 보낼 수 있다. 단, **브라우저는 서버로 요청을 보내지 않아야 한다**
- 브라우저의 뒤로 가기와 같은 사용자의 페이지 전환 요청을 자바스크립트에서 처리할 수 있다. 이때도 **브라우저는 서버로 요청을 보내지 않아야 한다**

## 브라우저 히스토리 API를 이용한 SPA 구현

```js
import React, { Component } from 'react';

class App2 extends Component {
  state = {
    pageName: '',
  };

  componentDidMount() {
    window.onpopstate = event => {
      this.onChangePage(event.state);
    };
  }

  onChangePage = pageName => {
    this.setState({pageName});
  };

  onClick1 = () => {
    const pageName = 'page1';
    window.history.pushState(pageName, '', '/page1');
    this.onChangePage(pageName);
  }

  onClick2 = () => {
    const pageName = 'page2';
    window.history.pushState(pageName, '', '/page2');
    this.onChangePage(pageName);
  }

  render() {
    const { pageName } = this.state;
    return (
      <>
        <button onClick={this.onClick1}>Page1</button>
        <button onClick={this.onClick2}>Page2</button>
        {!pageName && <Home />}
        {pageName === 'page1' && <Page1 />}
        {pageName === 'page2' && <Page2 />}
      </>
    );
  }
}

function Home() {
  return <h2>여기는 홈페이지입니다. 원하는 버튼을 클릭하세요</h2>
}

function Page1() {
  return <h2>여기는 Page1입니다</h2>
}

function Page2() {
  return <h2>여기는 Page2입니다</h2>
}

export default App2;
```
- pushState: 히스토리 스택에 state를 쌓는 함수
- onpopstate: 브라우저의 뒤로 가기 버튼을 누를 경우 발생되는 이벤트
- replaceState: 히스토리 스택에 state를 쌓지 않고 가장 최신의 state를 대체하는 함수


## react-router-dom 사용

`npm i react-router-dom`

- 리액트로 SPA를 만들 때 많이 사용되는 라우팅 모듈
- 내부적으로는 브라우저 히스토리 API를 이용

```js
// index.js
import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Rooms from './Rooms';

class App3 extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ padding: 20, border: '5px solid gray'}}>
          <Link to="/">홈</Link>
          <br />
          <Link to="/photo">사진</Link>
          <br />
          <Link to="/rooms">방 소개</Link>
          <br />
          <Route exact path="/" component={Home} />
          <Route path="/photo" component={Photo} />
          <Route path="/rooms" component={Rooms} />
        </div>
      </BrowserRouter>
    );
  }
}

function Home({ match }) {
  return <h2>이곳은 홈페이지입니다.</h2>
}

function Photo({ match }) {
  return <h2>여기서 사진을 감상하세요.</h2>
}

export default App3;
```

- `BrowserRouter`: react-router-dom을 이용하기 위해서는 컴포넌트 전체를 BrowserRouter 컴포넌트로 감싸야 한다
- `Link`: 페이지를 전환할 경우 사용하는 컴포넌트
  - to: 이동할 주소를 나타냄
- `Router`: 각 페이지에 대한 정의
  - exact: 속성값이 완전히 일치해야 해당 컴포넌트가 렌더링됨
  - path: 현재 주소가 path 속성값으로 시작하면 component 속성값이 가리키는 컴포넌트를 렌더링함
  - component: 렌더링할 컴포넌트

```js
// Rooms.js
import React from 'react';
import { Route, Link } from 'react-router-dom';

function Rooms({ match }) {
  return (
    <>
      <h2>여기는 방을 소개하는 페이지입니다.</h2>
      <Link to={`${match.url}/blueRoom`}>파란 방입니다</Link>
      <br />
      <Link to={`${match.url}/greenRoom`}>초록 방입니다</Link>
      <br />
      <Route path={`${match.url}/:roomId`} component={Room} />
      <Route
        exact
        path={match.url}
        render={() => <h3>방을 선택해주세요</h3>}
      />
      <br />
    </>
  );
}

export default Rooms;

function Room({ match }) {
  return <h2>{`${match.params.roomId} 방을 선택하셨습니다`}</h2>;
}
```

- Route를 통해서 렌더링되는 컴포넌트는 match라는 속성값을 사용할 수 있음
- match.url은 Route 컴포넌트의 path 속성값과 같음
- Route 컴포넌트의 path 속성값에서 콜론을 사용하면 파라미터를 나타낼 수 있음
  - 추출된 파라미터는 `match.params.{파라미터이름}` 형식으로 사용될 수 있음
