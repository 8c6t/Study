React 내장 Hook API (2) - useReducer, useImperativeHandle, useLayoutEffect, useDebugValue
========

## useReducer

`useReducer(reducer, initialState)`

- 컴포넌트의 state를 리덕스의 리듀서처럼 관리할 수 있는 훅
- 매개변수로 리듀서 함수와 초기 상태값을 입력
- 상태값과 dispatch 함수를 차례대로 반환
  - 리덕스의 dispatch 함수와 동일한 방식으로 사용


```js
import React, { useReducer } from 'react';

const INITIAL_STATE = { name: '', price: 0 };

const SET_NAME = 'SET_NAME';
const SET_PRICE = 'SET_PRICE';

function reducer(state, action) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.name
      };
    case SET_PRICE:
      return {
        ...state,
        price: action.price
      };
    default: 
      return state;
  }
}

const ItemDetail = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, price } = state;

  const onChangeName = (e) => {
    dispatch({
      type: SET_NAME,
      name: e.target.value,
    });
  }

  const onChangePrice = (e) => {
    dispatch({
      type: SET_PRICE,
      price: e.target.price,
    })
  }

  return (
    <div>
      <p>{`ITEM NAME: ${name}`}</p>
      <p>{`ITEM PRICE: ${price}`}</p>
      <input
        type='text'
        value={name}
        onChange={onChangeName}
      />
      <input
        type='text'
        value={price}
        onChange={onChangePrice}
      />
    </div>
  );
}
```

### Context API 로 dispatch 함수를 하위 컴포넌트에 전달

```js
export const ItemDispatch = createContext();

const ItemDetailParent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>{`ITEM NAME: ${name}`}</p>
      <p>{`ITEM PRICE: ${price}`}</p>
      <ItemDispatch.Provider value={}>
        <Children />
      </ItemDispatch.Provider>
    </div>
  );
}
```
- Context API의 Provider를 이용하여 dispatch 함수를 하위 컴포넌트로 쉽게 전달하여 사용할 수 있다


## useImperativeHandle

`useImperativeHandle(ref, createHandle, [deps])`

- ref를 통해 부모 컴포넌트에서 접근 가능한 함수를 구현하는 경우 사용하는 훅
- 자식 컴포넌트에 대해 의존성이 생기게 되므로 필요한 경우에만 사용하도록 한다

### 자식 컴포넌트

```js
import React, { forwardRef, useState, useImperativeHandle } from 'react';

const Children = (props, ref) => {
  const [username, setUsername] = useState('');
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    getUsername: () => username,
    addCount: value => setCount(count + value),
  }));

  return (
    <div>
      <input ref={inputRef} onChange={(e) => setUsername(e.target.value)} />
    </div>
  );
}

export default forwardRef(Children);
```
- 부모 컴포넌트에서 입력한 ref 객체를 직접 처리하기 위해 `forwardRef` 함수를 사용
  - ref 객체는 두번째 매개변수
- `useImperativeHandle` 훅으로 ref 객체와 부모 컴포넌트에서 접근 가능한 여러 함수를 전달


### 부모 컴포넌트

```js
const Parent = () => {
  const childrenRef = useRef();
  
  const onClick = () => {
    if (childrenRef.current) {
      console.log(childrenRef.current.getUsername());
      childrenRef.current.addCount(3);
    }
  }

  return (
    <div>
      <Children ref={childrenRef} />
      <button onClick={onClick}>자식 컴포넌트 메소드 실행</button>
    </div>
  )
}
```

## useLayoutEffect

- 렌더링 결과가 DOM에 반영된 후 비동기로 호출되는 useEffect와 달리 **동기**로 호출되는 훅
  - 매개변수로 전달한 함수가 많은 연산을 요구할 경우 성능상 문제가 될 수 있음
- 렌더링 직후 DOM 요소의 값을 얻어야 하는 경우에는 `useLayoutEffect`를 사용하는 것이 바람직함
- 클래스 컴포넌트의 `componentDidMount`, `componentDidUpdate` 메소드도 렌더링 결과가 DOM에 반영된 직후 동기로 호출되므로, 훅 포팅시 useLayoutEffet를 사용하는 것이 안전


## useDebugValue

`useDebugValue(value)`

- 개발의 편의를 위해 제공되는 훅. 커스텀 훅의 내부 상태 관찰이 가능해져 디버깅에 도움이 된다
  - 리액트 개발자 도구에서 확인 가능
- 디버깅 시 확인할 값을 매개변수로 입력

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```
