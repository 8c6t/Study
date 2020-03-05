제너레이터(Generator)
========

- `function*` 문으로 정의한 함수
- 함수의 실행을 중간에 멈추고 재개할 수 있으며 자신의 상태를 관리
- 실행을 멈출 때마다 값을 전달 가능
- 필요한 순간에 값을 계산해서 전달(값을 미리 만들어두지 않음)

## 1. 제너레이터의 정의와 실행

```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
  return 'finished';
}

const iterator = generator();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 'finished', done: true }
```

1. 제너레이터 함수를 실행하면 제너레이터 객체(이터레이터)를 반환
    - 객체를 반환할 뿐 함수 내부 코드가 실행되지는 않음
    - next, return, throw 메소드를 가지고 있음
2. next 메소드가 호출되면 yield 키워드를 만날 때까지 실행되고 데이터 객체를 반환
    - value 속성에 yield 표현식에 지정한 값을 저장
    - done 속성에 함수가 끝까지 실행되었는지 여부를 저장
3. yield 키워드가 더 이상 없는 경우 done 속성값을 true로 반환
    - return 값이 없는 경우 value는 undefined
    - 한 번 종료된 제너레이터 객체의 next 메소드를 호출해도 done 속성값은 true


## 2. yield

- 제너레이터 함수의 정지-재시작 위치를 지정하는 키워드
- yield에 지정한 값이 next 메소드의 반환값이 됨
- return 문의 사용법과 같음

### yield*

```js
function* g1() {
  yield 2;
  yield 3;
}

function* g2() {
  yield 1; 
  yield* g1();
  yield* [4, 5];
}

console.log(...g2()); // 1 2 3 4 5
```

- 제너레이터 객체를 비롯한 반복 가능한(iterable) 객체를 `yield*`에 지정
- 반복 가능한 객체에서 순차적으로 값을 꺼내 각각의 값에 yield를 적용


## 3. 제너레이터 함수로 데이터 전달

```js
function* generator() {
  const data1 = yield;
  console.log(data1); // 10
  const data2 = yield;
  console.log(data2); // 20
}

const iterator = generator();
iterator.next();
iterator.next(10);
iterator.next(20);
```

- next 메소드의 파라미터로 데이터를 전달할 수 있음
- 첫번째 next 메소드는 제너레이터 함수의 실행이 시작되도록 하는 역할만 수행


## 4. 제너레이터 종료

```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = generator();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.return(10)); // { value: 10, done: true }
console.log(iterator.next()); // { value: undefined, done: true }
```

- return 메소드를 이용하여 제너레이터를 종료할 수 있음
- 파라미터 값을 반환한 뒤 제너레이터를 종료


## 5. 제너레이터 예외 던지기

```js
function* generator() {
  let count = 0;

  while(true) {
    try {
      yield count++;
    } catch(e) {
      console.log(e);
    }
  }
}

const iterator = generator();
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
iterator.throw(new Error('오류'));
console.log(iterator.next()); // { value: 2, done: false }
```

- throw 메소드를 이용하여 제너레이터에 예외를 던질 수 있음
- try/cath 문으로 처리
 