Immutable.js
========

자바스크립트에서 불변성 데이터를 다룰 수 있도록 하는 라이브러리

## 1. 사용 이유

- 리액트 컴포넌트는 state나 props 값이 변경되면 리렌더링을 거치는데, 배열이나 객체를 직접 수정한다면 인스턴스 내부 값을 수정했더라도 레퍼런스 변수가 가리키는 인스턴스는 동일하기 때문에 같은 값으로 인식하게 됨
- 이러한 문제 때문에 확산 연산자 등을 이용하여 기존 값을 가진 새 객체나 배열을 만들어야 했음
  - 수정해야 할 값이 깊은 곳에 위치한다면 코드가 복잡해지는 문제가 있음

## 2. Map

- 객체 대신 사용하는 데이터 구조
- 기존 Map을 변경하는 것이 아닌, 새로운 Map을 반환

### Map 생성

```js
const { Map } = require('immutable');

const data = Map({
  a: 1,
  b: 2,
  c: Map({
    d: 3,
    e: 4,
    f: 5,
  })
});
```

- 파라미터로 객체를 넣어서 호출

### fromJS를 이용한 Map 생성

```js
const { Map, fromJS } = require('immutable');

const data2 = fromJS({
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: 5,
  }
});
```
- 내부 객체까지 Map으로 만들어야 할 경우 사용


### 자바스크립트 객체로 변환(`toJS`)
```js
const deserialized = data.toJS();
console.dir(deserialized);  // { a: 1, b: 2, c: { d: 3, e: 4, f: 5 } }
```

### 특정 키의 값 불러오기(`get`)
```js
const get = data.get('a');
console.log(`[특정 키 값 불러오기]: ${get}`);  // 1
```

### 깊숙이 위치하는 값 불러오기(`getIn`)
```js
const getIn = data.getIn(['c', 'd']);
console.log(`[깊숙이 위치하는 값 불러오기]: ${getIn}`);  // 3
```


### 값 설정(`set`)
```js
const newData = data.set('a', 4);
console.log("[값 설정]");
console.dir(newData.toJS());  // { a: 4, b: 2, c: { d: 3, e: 4, f: 5 } }
console.log(newData === data);  // false
```

### 깊숙이 위치하는 값 수정하기(`setIn`)
```js
const newData2 = data.setIn(['c', 'd'], 10);
console.log("[깊숙이 위치하는 값 수정하기]");
console.dir(newData2.toJS());  // { a: 1, b: 2, c: { d: 10, e: 4, f: 5 } }
```

### 여러 값 동시에 설정(`mergeIn`, `setIn`, `merge`)
```js
const newData3 = data.mergeIn(['c'], {d: 10, e: 10});
console.log("[여러 값 동시에 설정: mergeIn()]");
console.dir(newData3.toJS());  // { a: 1, b: 2, c: { d: 10, e: 10, f: 5 } }

console.log("[여러 값 동시에 설정: setIn() 메소드 체이닝]");
const newData4 = data.setIn(['c', 'd'], 10).setIn(['c', 'e'], 10);
console.dir(newData4.toJS());  // { a: 1, b: 2, c: { d: 10, e: 10, f: 5 } }

console.log("[최상위에서 merge 작업시]");
const newData5 = data.merge({ a: 10, b: 10 });
console.dir(newData5.toJS());  // { a: 10, b: 10, c: { d: 3, e: 4, f: 5 } }
```

### 3. List

- 배열 대신 사용하는 데이터 구조
- map, filter, sort, push, pop 함수 내장
- 기존 List를 변경하는 것이 아닌, 새로운 List를 반환
- 리액트 컴포넌트는 List 데이터 구조와 호환되기 때문에 map 함수를 이용하여 데이터가 들어 있는 List를 컴포넌트 List로 변환하여 JSX에서 보여 주어도 제대로 렌더링 됨


### List 생성
```js
const { Map, List, fromJS } = require('immutable');
const list = List([0,1,2,3,4]);

const list2 = List([
  Map({ value: 1 }),
  Map({ value: 2 })
]);

const list3 = fromJS([
  { value: 1 },
  { value: 2 }
]);
```
- 객체들의 List를 만들어야 할 때는 객체들을 Map으로 만들어야 get, set을 사용할 수 있음


### 값 읽어오기(`get`, `getIn`)
```js
const get = list.get(0);
const getin = list2.getIn([0, 'value']);
console.log(get);  // 0
console.log(getin);  // 1 
```


## 아이템 수정(`set`, `setIn`, `update`)
```js
// 원소를 통째로 바꿀 경우
const newList = list.set(0, Map({ value: 10 }));
console.log(newList.toJS());  // [ { value: 10 }, 1, 2, 3, 4 ]

// List의 Map 내부 값을 변경하고자 할 경우
const newList2 = list2.setIn([0, 'value'], 10);
console.log(newList2.toJS());  // [ { value: 10 }, { value: 2 } ]

// 기존 값을 참조해야 하는 경우
const newList3 = list2.update(0, item => item.set('value', item.get('value') * 5));
console.log(newList3.toJS());  // [ { value: 5 }, { value: 2 } ]
```

### 아이템 추가(`push`, `unshift`)
```js
// 아이템 추가
const newList4 = list2.push(Map({ value: 3 }));

// 맨 앞에 아이템 추가
const newList5 = list2.unshift(Map({ value: 0 }));
console.log(newList4.toJS());  // [ { value: 1 }, { value: 2 }, { value: 3 } ]
console.log(newList5.toJS());  // [ { value: 0 }, { value: 1 }, { value: 2 } ]
```

### 아이템 제거(`delete`, `pop`)
```js
// 아이템 제거
const newList6 = list.delete(1);
console.log(newList6.toJS());  // [ 0, 2, 3, 4 ]

// 마지막 아이템 제거
const newList7 = list.pop();
console.log(newList7.toJS());
```

### 리스트 크기 가져오기
```js
console.log(list.size);  // 5
console.log(list.isEmpty());  // false
```

--------

> [Immutable 공식 문서](https://immutable-js.github.io/immutable-js/docs/#/)