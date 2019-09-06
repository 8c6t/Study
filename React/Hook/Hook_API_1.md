React 내장 Hook API (1) - useContext, useRef, useMemo, useCallback
========

## useContext

`useConext(Context)`

- Consumer 컴포넌트를 사용하지 않고 context를 활용할 수 있는 훅
  - 기존 Consumer 컴포넌트 방식은 Consumer 컴포넌트 안쪽에서만 context 데이터에 접근 가능하다는 한계가 있음
- useContext로 전달하는 인자는 createContext에서 반환된 context 객체 그 자체이어야 함
- Hook을 호출하는 컴포넌트에 가장 가까이에 있는 해당 Provider의 value props 값을 사용

```js
import React, { createContext, useContext } from 'react';

const ValueContext = createContext();
const item = { id: 5, price: 8620 }

const Parent = () => {
  return (
    <ValueContext.Provider value={item}>
      <Children />
    </ValueContext.Provider>
  );
}

const Children = () => {
  const { id, price } = useContext(ValueContext);
  return (
    <div>
      <h3>ID: {id}</h3>
      <h3>PRICE: {prce}</h3>
    </div>
  );
}
```

## useRef

`useRef(initialValue)`

- 함수형 컴포넌트에서 DOM 객체에 접근하거나, 클래스 컴포넌트의 멤버 변수처럼 렌더링과 무관한 값을 저장하기 위해 사용
  - 함수형 컴포넌트는 인스턴스로 생성되지 않기 때문에 사용한 컴포넌트의 고유한 값을 저장하기 위해 사용
- 변경 가능한 `.current` 프로퍼티 값을 가지는 ref 객체를 반환
  - `.current` 값은 useRef의 인자값으로 초기화됨
  - 순수 자바스크립트 객체 생성하며, 매 렌더링 시마다 동일한 ref 객체 제공
- `.current` 값이 변경되어도 리렌더링을 발생시키지 않음


### DOM 객체 접근

```js
import React, { useRef } from 'react';

const TextInputWithFocusButton = () => {
  const inputEl = useRef(null);
  const onClick = () => {
    inputEl.current.focus();
  }

  return (
    <>
      <input ref={inputEl} type='text' />
      <button onClick={onClick}>Focus the input</button>
    </>
  )
}
```

### 렌더링과 관계 없는 값 저장

```js
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [text, setText] = useState('');
  const prevTextRef = useRef('');

  useEffect(() => {
    prevTextRef.current = text;
  }, [text]);

  const onChange = (e) => {
    setText(e.target.value);
  }

  const prevText = prevTextRef.current;
  return (
    <>
      <h2>{`prev: ${prevText}`}</h2>
      <h2>{`curr: ${text}`}</h2>
      <input type='text' onChange={onChange} />
    </>
  );
}

export default App;
```

- text가 변경되서 다시 렌더링될 때 prevText는 이전 state 값을 가리킨다
- 렌더링이 끝난 뒤 prevTextRef는 text의 최신 상태값으로 변경된다


## useMemo

`useMemo(factory, deps)`

- 이전 값을 기억해서 성능을 최적화하는 용도로 사용되는 메모이제이션 훅
- 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용
- 첫 번째 매개변수로 생성 함수를, 두 번째 매개변수로 의존성 값이 담긴 배열을 전달
  - 생성 함수는 렌더링 중에 실행되므로 렌더링 중에 일어나는 작업을 하지 않아야 한다
- 배열의 값이 변경될 때에만 값을 다시 계산

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## useCallback

`useMemo(callback, deps)`

- 이전 값을 기억해서 성능을 최적화하는 용도로 사용되는 메모이제이션 훅
- 렌더링 성능 향상을 위한 용도로 사용
  - 컴포넌트가 렌더링될 때마다 함수가 생성되어 해당 함수를 props로 받는 자식 컴포넌트가 불필요하게 리렌더링 되는 현상을 방지
- 첫 번째 매개변수로 생성될 함수를, 두 번째 매개변수로 의존성 값이 담긴 배열을 전달
- 배열의 값이 변경될 때에만 함수를 다시 생성. 배열의 값이 변경되지 않으면 이전에 생성한 함수가 재사용됨

```js
import React, { useState, useCallback } from 'react';

const Parent = () => {
  const [id, setId] = useState('');
  const [item, setItem] = useState('');
  const onAdd = useCallback(() => addToCart(id, item), [id, item]);
  return (
    <div>
      <h2>{`ID: ${id}`}</h2>
      <h2>{`ITEM: ${item}`}</h2>
      <Children
        onAdd={onAdd}
        setId={setId}
        setItem={setItem}
      />
    </div>
  );
}
```

