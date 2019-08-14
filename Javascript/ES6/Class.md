Class 구문
========

- 객체지향 프로그래밍 언어에서 제공하는 Class 구문을 구현
- 개발의 편의성을 위해 도입된 문법으로, 내부적으로는 **기존 Javascript의 생성자 함수를 이용**한다


## 생성자 함수

```js
function Car(brand, model, release) {
  this.brand = brand;
  this.model = model;
  this.release = release;
  this.getModel = function() {
    return this.model;
  }
}

Car.prototype.getCarInfo = function() {
  return `brand: ${this.brand}, model: ${this.model}, release: ${this.release}`;
}

Car.newer = function(car1, car2) {
  return (car1.release >= car2.release) ? car1 : car2;
}

const car1 = new Car('Tesla', 'Model X', 2015);
```
- 기존 자바스크립트에서 new 연산자로 객체를 생성할 수 있도록 정의하는 함수
- 객체를 생성하고 초기화하는 역할
- 생성자임을 알리기 위해 관례적으로 파스칼 표기법을 사용
- 생성자 내에서 `this.프로퍼티명`에 값을 대입하면 그 이름을 가진 프로퍼티에 값이 할당된 객체가 생서됨


### prototype

- 객체 인스턴스는 생성자의 prototype 프로퍼티를 `__proto__` 프로퍼티에 저장
- 동적 디스패치를 통해 해당 클래스의 인스턴스가 prototype에 접근
  - 객체의 프로퍼티나 메소드에 접근하려 할 때 그런 프로퍼티나 메소드가 존재하지 않는 경우, 객체의 프로토타입에서 해당 프로퍼티나 메소드를 찾음
- 클래스의 인스턴스는 모두 같은 prototype을 공유


## class 구문

```js
class Car {
  constructor(brand, model, release) {
    this.brand = brand;
    this.model = model;
    this.release = release;
  }

  getModel() {
    return this.model;
  }

  getCarInfo() {
    return `brand: ${this.brand}, model: ${this.model}, release: ${this.release}`;
  }

  static newer(car1, car2) {
    return (car1.release >= car2.release) ? car1 : car2;
  }
}

const car2 = new Car('Tesla', 'Model 3', 2017);
```

- 클래스에 대한 생성자를 명시적으로 기술
- 특정 인스턴스와 관련이 없는 메소드를 정적 메소드로 선언(static)


## 상속

```js
class UsedCar extends Car {
  constructor(brand, model, release, previousOwner, currentOwner) {
    super(brand, model, release);
    this.previousOwner = previousOwner;
    this.currentOwner = currentOwner;
  }

  // override
  getCarInfo() {
    return `${super.getCarInfo()}, Previous Owner: ${this.previousOwner}, Current Owner: ${this.currentOwner}`;
  }
}

const car3 = new UsedCar('Toyota', 'Hachiroku', 2012, 'jQuery', 'React');
car3 instanceof UsedCar; // true
car3 instanceof Car; // true
```

- extends, super 키워드를 사용하여 상속을 이용한 확장 가능