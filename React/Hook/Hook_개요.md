React Hook 개요
========

- 함수형 컴포넌트에서도 클래스형 컴포넌트의 기능을 사용할 수 있게 하는 기능
- 함수형 컴포넌트에서 state를 관리하거나 라이프 사이클 메소드를 이용할 수 있게 됨


## 기존 방식의 문제점

- 로직을 재사용하기 위해 고차 컴포넌트와 렌더 속성값 패턴을 사용하면서 리액트 요소 트리가 깊어지는 문제
- 리액트 요소 트리가 깊어지면 성능에 악영향을 주고, 디버깅에 어려움이 생김

### 클래스 컴포넌트의 한계

- 서로 연관성이 없는 여러 로직을 하나의 라이프 사이클 메소드에서 작성하는 경우가 많음
- state, 라이프 사이클 메소드를 이용하기 위해 클래스형 컴포넌트 작성 시 부수적으로 작성해야 하는 코드가 많음
- 코드 압축이 잘 이루어지지 않음
- 핫 리로딩시 버그 발생의 여지
- 컴파일 단계에서 코드 최적화의 어려움


## 훅의 장점

- 재사용 가능한 로직을 쉽게 작성 가능
- 로직을 한곳으로 모을 수 있어 가독성이 좋아짐
- 단순 함수이므로 정적 타입 언어로 타입 정의가 쉬워짐


## State Hook(`useState`)

```js
import React, { useState } from 'react';

const [count, setCount] = useState(0);
const [foo, setFoo] = useState('lol');
```

- 함수형 컴포넌트에서 state를 관리할 수 있도록 하는 함수
- 인자로 초기 state 값을 받음
- 컴포넌트를 렌더링할 때 한 번만 생성됨
- 배열에 두 값을 넣어서 반환
  - 첫 번째 값: state 변수. useState 함수 호출 시 입력한 인자가 초기값으로 사용됨
  - 두 번째 값: state 변경 함수
- 복수의 useState 훅 사용 가능


### 사용 예시

```js
import React, { useEffect, useState } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Click</button>
}
```
- `this.state`로 값을 가져오는 클래스형 컴포넌트와 달리 해당 state 값을 직접 가져올 수 있음
- 리렌더링 시 useState를 통해 반환받은 첫 번째 값은 항상 최신 state

### 이전 state값을 이용
```js
import React, { useState } from 'react';
 
const Counter = ({initialState}) => {
  const [count, setCount] = useState(initialState);
  const onClickBtn = () => {
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <>
      Count: {count}
      <button onClick={onClickBtn}>연속 증가</button>
    </>
  );
}
```
- 비동기로 state값을 변경하기 때문에 count는 2만큼 증가하지 않고 1만큼 증가함

#### 해결 방법
```js
const onClickBtn = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
}
```
- 이전 state를 사용해서 새로운 state를 계산하는 경우 함수를 setState로 전달할 수 있음
  - 자신이 호출되기 직전의 state값을 매개변수로 받음


## Effect Hook(`useEffect`)

- side effects와 관련된 작업을 수행하는 함수
  - 다른 컴포넌트에 영향을 줄 수 있고, 렌더링 과정에서는 구현할 수 없는 작업
  - 외부 API 호출과 관련된 작업
  - DOM을 직접 조작하는 작업
- 함수형 컴포넌트에서 라이프 사이클 메소드를 이용할 수 있도록 하는 훅
  - `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 를 하나로 통합한 API

### 사용 예시

```js
import React, { useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  return <button onClick={() => setCount(count + 1)}>Click</button>
}
```
- useEffect 훅에 입력된 함수는 렌더링 결과가 실제 돔에 반영된 후에 호출됨


### 조건부 함수 호출

```js
import React, { useEffect, useState } from 'react';

const Profile = ({ id }) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    getItemAPI(id).then(data => setItem(data));
  }, [id]);

  return (
    <div>
      {!item && <p>상품 정보 로딩 중</p>}
      {item && (
        <>
          <p>{`상품명: ${item.name}`}</p>
          <p>{`가격: ${item.price}`}</p>
        </>
      )}
    </div>
  );
}
```
- useEffect 훅에 임력된 함수는 렌더링 될 때마다 호출된다
- 두 번째 파라미터로 배열을 입력하면, **배열의 값이 변경되는 경우에만 함수가 호출된다**


### 복수의 useEffects 사용

```js
const MyComponent = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  const [item, setItem] = useState(null);
  useEffect(() => {
    getItemAPI(id).then(data => setItem(data));
  }, [id]);
  
  // ...
}
```
- useEffect 훅은 여러 개를 등록해서 사용할 수 있으므로, 서로 다른 로직이 하나의 라이프 사이클 메소드에서 작성되던 클래스형 컴포넌트의 문제를 해결할 수 있음


### 이벤트 처리 함수 등록 및 해제
```js
import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost]);
}
```
- useEffect 훅의 첫 번째 매개변수에 등록된 함수가 또 다른 함수를 반환할 수 있음
- 반환된 함수는 컴포넌트가 언마운트되거나 첫 번째 매개변수로 입력된 함수가 호출되기 직전에 호출된다
  - 프로그램이 비정상적으로 종료되지 않는다면 반드시 호출될 것이 보장됨
- useEffect 훅의 두 번째 매개변수에 빈 배열을 넣으면 컴포넌트가 마운트될 때만 첫 번째 매개변수로 입력된 함수가 호출되고, 컴포넌트가 언마운트될 때만 반환된 함수가 호출됨
  - 클래스형 컴포넌트의 `componentDidMount`와 `componentWillUnmount` 메소드에서만 실행되는 것과 같은 효과


## 커스텀 훅
```js
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return width;
}

const [id, onChangeId] = useInput('');
const width = useWindowWidth();
```

- 리액트가 제공하는 훅을 이용해서 커스텀 훅을 만들 수 있음
- 커스텀 훅을 이용하여 고차 함수, 렌더 속성값 패턴처럼 상태 관련 로직을 컴포넌트 간에 재사용할 수 있음


## 훅 사용 규칙

- 최상위(at the top level)에서만 호출해야 함
  - 리액트가 state의 값을 구분할 수 있는 유일한 정보는 **훅이 사용된 순서**
  - 훅이 사용된 순서를 저장하고 배열에 저장된 순서를 기반으로 훅을 관리함
  - 순서가 보장되지 않는 반복문, 조건문, 중첩된 함수 내에서 훅을 호출해서는 안 된다
- 함수형 컴포넌트 혹은 커스텀 훅 안에서만 사용되어야 한다
