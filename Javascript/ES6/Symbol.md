Symbol
========

## 1. Symbol 이란

- ES6에 추가횐 새로운 원시 자료형
- 자기 자신을 제외한 그 어떤 값과도 다른 **유일무이한 값**


## 2. Symbol 생성

```js
const symbol1 = Symbol();
```
- `Symbol()` 메소드를 사용하여 생성

```js
const symbol2 = Symbol();
console.log(symbol1 === symbol2); // false
```
- Symbol() 은 호출할 때마다 새로운 값을 생성

```js
const NAME = Symbol("hachicore");
console.log(NAME.toString()); // Symbol(hachicore)
```
- Symbol 생성 시 인수를 추가하여 Symbol에 설명을 추가할 수 있음
- Symbol의 설명은 `toString` 메소드를 이용하여 확인 가능


## 3. Symbol과 문자열 연결

```js
const symbol1 = Symbol.for("typescript");
const symbol2 = Symbol.for("typescript");

console.log(symbol1 === symbol2); // true
console.log(Symbol.keyFor(symbol1)); // typescript
```
- `for` 메소드를 이용하여 문자열과 연결된 Symbol을 생성하거나 불러올 수 있음
- 문자열과 연결된 Symbol 생성 시 전역 레지스트리에 Symbol이 만들어짐
- `keyFor`메소드로 Symbol과 연결된 문자열을 구할 수 있음


## 4. 객체의 프로퍼티 이름으로 Symbol 사용

```js
const obj = { [Symbol("hachicore")] : 8620 }
console.log(obj); // Object { Symbol(hachicore): 8620 }
```

- ES5 까지는 객체의 프로퍼티 이름으로 식별자나 문자열만 사용할 수 있었지만, ES6부터는 Symbol을 프로퍼티 이름으로 사용할 수 있음
- 함수 안에서 Symbol을 생성하여 그것을 속성 이름으로 사용하고 그 프로퍼티에 값을 할당하면 함수 바깥에서 프로퍼티 값을 읽거나 쓸 수 없음
  - for/in 반복문
  - Object.keys
  - Object.getOwnPropertyNames
- 단, Object.getOwnPropertySymbols 메소드를 사용하면 객체 내에서 이름을 Symbol로 지정한 프로퍼티 이름 목록을 가져올 수 있음


## 4. 기본 생성자 prototype의 안전한 확장

```js
Array.prototype[Symbol.for("shuffle")] = function() {
  const a = this;
  let m = a.length, t, i;
  while(m) {
    i = Math.floor(Math.random() * m--);
    t = a[m]; a[m] = a[i]; a[i] = t;
  }
  return this;
}

const array = Array(10).fill(0).map((v, i) => i + 1);

console.log(array[Symbol.for("shuffle")]());
```

- 기본 생성자의 prototype에 메소드를을 확장하는 것은 권장되지 않으나, Symbol을 이용하면 메소드 오버라이딩을 피하면서 안전한 확장이 가능하다
