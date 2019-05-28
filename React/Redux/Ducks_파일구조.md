Ducks 파일 구조
========

리덕스의 액션 타입, 액션 생성 함수, 리듀서를 한 파일에서 모듈화하여 관리하는 파일 구조

## 예시

```js
// 액션 타입 정의
const CREATE = 'my-app/todos/CREATE';
const REMOVE = 'my-app/todos/REMOVE';
const TOGGLE = 'my-app/todos/TOGGLE';

// 액션 생성 함수 만들기
export const create = (todo) => ({
  type: CREATE,
  todo,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

// 리듀서 정의
export default function reducer(state = initialState, action) {
  switch(action.type) {
    // 리듀서 관련 코드...
  }
}
```

## 규칙

1. `export default`를 이용하여 **리듀서**를 내보냄
2. `export`를 이용하여 **액션 생성 함수** 를 내보냄
3. 액션 타입 이름은 **npm-module-or-app/reducer/ACTION_TYPE** 형식으로 만듬
4. 외부 리듀서에서 모듈의 액션 타입이 필요할 때는 액션 타입을 내보내도 됨


## export와 export default 차이

| export | export default |
|-|-|
| Named exports | Default exports |
| 모듈 당 여러 개의 export 가능 | 모듈 당 하나의 export만 가능 |
| export된 변수명을 사용하여 import | export시 변수명 지정 가능 |
| `import { createStore } from 'redux'` | `import Application from './containers/App'`<br/>`import App from './containers/App'`<br/>`import MyApp from './containers/App'` |

> Named Export 된 변수들을 `import * as` 구문을 사용하여 전부 import 가능