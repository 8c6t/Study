훅 포팅
========

- getSnapshotBeforeUpdate, getDerivedStateFromError, componentDidCatch 메소드를 제외한 기능들을 구현 가능
- 기존의 클래스 컴포넌트와 1:1로 대응하는 훅이 존재하는 것이 아니기에 상황에 따라서는 커스텀 훅을 만들어야 할 필요가 있음


## 1. constructor 메소드

- 클래스 컴포넌트의 constructor 메소드는 주로 props로부터 state를 설정하거나, componentDidMount보다 조금 더 빠르게 작업을 처리하는 용도로 사용됨

### 클래스 컴포넌트

```js
import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.originalPrice - props.discountPrice
    };
    callAPI();
  }
}
```

### 함수형 컴포넌트(훅)

```js
import React, { useState, useEffect, useRef } from 'react';

function FunctionalComponent({ originalPrice, discountPrice }) {
  const [price, setPrice] = useState(originalPrice - discountPrice);
  const isFirstRef = useRef(true);

  if (isFirstRef.current) {
    isFirstRef.current = false;
    callAPI();
  }
}
```
- 최초 렌더링 여부를 구분하여 로직을 실행할 수 있도록 useRef를 활용


### 커스텀 훅으로 생성

```js
function useOnFirstRender(func) {
  const isFirstRef = useRef(true);
    if (isFirstRef.current) {
      isFirstRef.current = false;
      func();
    }
}

function FunctionalComponent({ originalPrice, discountPrice }) {
  const [price, setPrice] = useState(originalPrice - discountPrice);
  useOnFirstRender(callAPI);
}
```


## 2. componentDidUpdate 메소드

- 클래스 컴포넌트는 최초 렌더링 후 componentDidMount 메소드가 호출되고, 이후에는 componentDidUpdate 메소드가 호출되지만, useEffect 훅은 최초 렌더링 후에도 호출됨
  - useEffect의 조건부 함수 호출을 이용한 경우 componentDidMount + componentDidUpdate의 형태이므로 componentDidUpdate와 완전히 동일하지 않음
- 클래스 컴포넌트는 인스턴스에 이전 값을 저장해서 제공하지만, **함수형 컴포넌트는 인스턴스가 없기 때문에 이전 값이 필요하다면 useRef 훅으로 직접 관리해야 한다**


### 클래스 컴포넌트

```js
import React, { Component } from 'react';

class ClassComponent extends Component {
  state = {
    nickname: this.props.nickname
  };

  componentDidUpdate(prevProps) {
    const { userid, nickname } = this.props;
    if (prevProps.userid !== userid) {
      this.setState({ nickname });
    }
  }
}
```

### prevProps 관리를 위한 커스텀 훅

```js
function usePrevious(value) {
  const valueRef = useRef();

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
}

function useOnUpdate(func) {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      func();
    } else {
      isMountedRef.current = true;
    }
  });
}
```
- usePrevious: **렌더링 후** 현재 값을 이전 값으로 만들고, 이전 값을 반환
- useOnUpdate: 마운트 여부를 구분하여 로직을 실행할 수 있도록 useRef를 활용

> useEffect 훅에 입력된 함수는 렌더링 결과가 실제 DOM에 반영된 후에 호출됨


### 함수형 컴포넌트(훅)

```js
import React, { useState, useEffect, useRef } from 'react';

function FunctionalComponent(props) {
  const [nickname, setNickname] = useState(props.nickname);
  const prevUserId = usePrevious(props.userid);

  useOnUpdate(() => {
    if (prevUserId !== props.userid) {
      setNickname(props.nickname);
    }
  });
}
```


## 3. getDerivedStateFromProps 메소드

- 16.3 이후 componentWillReceiveProps 메소드를 대체하기 위해 등장한 정적 메소드
- props 변경에 따라 state를 변경해야 할 때 사용
- **setState를 사용하지 않고 값을 반환해야 함**
  - state 갱신 시에는 state 형태의 객체를 반환
  - 갱신이 필요하지 않은 경우 null 반한


### 클래스 컴포넌트

```js
import React, { Component } from 'react';

class SpeedIndicator extends Component {
  state = {
    isFaster: false,
    prevSpeed: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.speed !== prevState.prevSpeed) {
      return {
        isFaster: nextProps.speed > prevState.prevSpeed,
        prevSpeed: nextProps.speed,
      };
    }
    return null;
  }

  render() {
    const { isFaster } = this.state;
    return (
      <p>It's getting faster: { isFaster ? 'yes' : 'no' }</p>
    );
  }
}
```

### 함수형 컴포넌트

```js
import React, { useState } from 'react';

function Speedindicator({ speed }) {
  const [isFaster, setIsFaster] = useState(false);
  const [prevSpeed, setPrevSpeed] = useState(0);

  if (speed !== prevSpeed) {
    setIsFaster(speed > prevSpeed);
    setPrevSpeed(speed);
  }

  return (
    <p>It's getting faster: { isFaster ? 'yes' : 'no' }</p>
  );
}
```

- 이전 props 값을 useState 훅을 이용하여 보관
- props 값이 변경되면 **렌더링 과정에서 바로 state를 변경**
  - 렌더 함수에서 state를 변경하면 변경 된 state로 렌더 함수를 다시 호출함
  - DOM 변경 전에 발생하는 연산이므로 성능에 크게 영향을 주는 편은 아님

> ※ useState로 관리하지 않을 경우 렌더 함수가 무한대로 호출될 수 있음

## 4. forceUpdate 메소드

- 강제로 렌더링 트리거를 발생시켜야 하는 경우 사용하는 메소드

```js
const [_, forceUpdate] = useReducer(x => x + 1, 0);

function handleClick() {
  forceUpdate();
}
```
- forceUpdate 함수를 호출하면 state 값이 항상 변경되므로 렌더링이 강제로 이루어진다
