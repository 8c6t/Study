redux-actions
========


## 1. 환경 설정

### 가. 라이브러리 설치
```bash
yarn add redux-actions
```

### 나. 사용
```js
import { createAction, handleActions } from 'redux-actions';
```

## 2. createAction

```js
const INCREMENT = 'INCREMENT';
const SET_COLOR = 'SET_COLOR';

export const increment = createAction(INCREMENT);
export const setColor = createAction(SET_COLOR);

increment(3);
// { type: 'INCREMENT', payload: 3 }
setColor({ index: 5, color: '#fff' });
// { type: 'SET_COLOR', payload: { index: 5, color: '#fff' } }
```

- 액션이 가질 수 있는 정보의 이름을 payload로 통일
- 함수에 파라미터를 넣어서 호출하면 payload 키에 파라미터로 받은 값을 넣어 객체를 만듬

### 파라미터 명시

```js
export const setColor = createAction(
  SET_COLOR,
  ({ index, color }) => ({ index, color })
);
```
- createAction의 두 번째 파라미터에 **payload 생성함수** 전달하여 코드상으로 명시할 수 있음 


## 3. handleActions

```js
// 리듀서 초기 상태 정의
const initialState = Map({
  value: ''
});

// 리듀서 정의
export default handleActions({
  [SET_INPUT]: (state, action) => {
    return state.set('value', action.payload)
  }
}, initialState);
```

- 리듀서에 switch문을 사용하여 액션 type에 따라 다른 작업을 하도록 한 점을 개선
- 첫 번째 파라미터: 액션에 따라 실행될 함수들을 가진 객체
- 두 번째 파라미터: 상태의 기본 값(initialState)