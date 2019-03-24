람다 표현식과 기능적 인터페이스, 그리고 스트림
========

## 1. 람다 표현식

`(매개 변수 목록) -> 처리식`

- 익명 클래스의 가독성 문제를 보완하기 위해 등장.
- **인터페이스에 메소드가 하나**인 것들에 적용 가능. 
- 처리식이 한 줄 이상일 때는 처리식을 중괄호로 묶을 수 있다

### 주로 사용되는 메소드가 하나인 자바 인터페이스

- java.lang.Runnable
- java.util.Comparator
- java.io.FileFilter
- java.util.concurrent.Callable
- java.security.PrivilegedAction
- java.nio.file.PathMather
- java.lang.reflect.InvocationHandler

### 쓰레드를 이용한 람다 표현식 예시

```java
private void runThreadLambda() {
  new Thread(() -> {
    System.out.println(Thread.currentThread().getName());
  }).start();
}

// 처리식이 한 줄이라면 중괄호로 묶지 않아도 된다
private void runThreadLambdaSimple() {
  new Thread(() -> System.out.println(Thread.currentThread().getName())).start();
}
```


## 2. Functional Interface

```java
@FunctionalInterface
interface Calculate {
  boolean operation(String character);
}
```
- 기능적 인터페이스. 하나의 메소드만 선언되어 있는 인터페이스를 말한다
- 메소드가 하나만 존재하는 인터페이스는 @FuntionalInterface로 선언할 수 있으며, 이 인터페이스를 람다 표현식으로 처리할 수 있다.
  - 일반 인터페이스와 기능적 인터페이스의 혼동을 막기 위해 @FuntionalInterface 어노테이션을 설정하며, 기능적 인터페이스 형식에 적합한지 컴파일 단계에서 체크할 수 있게 된다
  - @FuntionalInterface 어노테이션 선언 시 해당 인터페이스에는 내용이 없는 **하나의 메소드**만을 선언할 수 있다


### java.util.function 패키지의 Functional 인터페이스 목록
- Predicate
- Supplier
- Consumer
- Function
- UnaryOperator
- BinaryOperator

#### Predicate
- test() 메소드가 존재
- 두 개의 객체를 비교할 때 사용
- boolean을 리턴
- 추가로 and(), negate(), or() 이라는 default 메소드가 구현되어 있으며, isEqual()이라는 static 메소드도 존재

#### Supplier
- get() 메소드가 존재
- Generic으로 선언된 타입을 리턴
- 추가적인 메소드는 선언되어 있지 않음

#### Consumer
- accept()라는 매개 변수를 하나 가지는 메소드가 존재
- 리턴값은 없음
- 작업을 수행하고 결과를 받을 일이 없을 때 사용
- 추가로 andThen() 이라는 default 메소드가 구현되어 있는데, 순차적인 작업을 할 때 사용하게 된다

#### Function
- apply() 라는 하나의 매개 변수를 가지는 메소드가 존재
- Function<T,R> 로 정의되어 있어, Generic 타입을 둘 가지고 있다.
  - 앞의 T는 타입
  - 뒤의 R은 리턴 타입
- 변환을 할 필요가 있을 때 이 인터페이스를 사용한다

#### UnaryOperator: A unary operator from T -> T
- apply() 라는 하나의 매개 변수를 가지는 메소드가 존재
- 한 가지 타입에 대하여 결과도 같은 타입일 경우 사용(리턴 타입이 동일)

#### BinaryOperator: A binary operator from (T, T) -> T
- apply() 라는 두 개의 매개 변수를 가지는 메소드가 존재
- 한 가지 타입에 대하여 결과도 같은 타입일 경우 사용


### ※ 인터페이스의 default method

- Java8 부터 지원
- **interface에 method를 구현**할 수 있는 기능
  - default method
  - static method

> [default method에 대한 자세한 설명](http://kbs0327.github.io/blog/technology/java8-default-interface/)


### 구현 예시(Predicate)

```java
@Test
public void predicateTest() {
  
  Predicate<String> lengthCheck   = (a) -> a.length() > 10;
  Predicate<String> containsCheck = (a) -> a.contains("Sakura Moyu");
  Predicate<String> startCheck    = (a) -> a.startsWith("FAVORITE");
  
  // test() : 해당 조건에 맞는지 확인
  assertTrue(containsCheck.test("Sakura Moyu - FAVORITE"));
  assertFalse(lengthCheck.test("Kuro"));
  
  // and(): 두 조건에 모두 맞는지 확인. 메소드 체이닝 가능
  String checkString = "FAVORITE - Hiiragi Haru";
  assertTrue(lengthCheck.and(startCheck).test(checkString));
  assertFalse(lengthCheck.and(containsCheck).and(startCheck).test(checkString));
  
  // or(): 두 조건 중 하나라도 맞는지 확인
  checkString = "Astral Aria";
  assertTrue(lengthCheck.or(containsCheck).test(checkString));
  
  // negate(): 데이터가 조건과 다른지 확인
  assertTrue(lengthCheck.negate().test("Kuro"));
  assertFalse(lengthCheck.negate().test("Hiiragi Haru"));
  
}
```

## 3. Stream

**스트림 생성 - 중간 연산 - 종단 연산** 의 구성

예시: `list.stream().filter(x -> x > 10).count()`

- 연속된 정보를 처리할 때 사용. 순차적으로 데이터를 처리함
- 컬렉션 타입만 스트림 객체를 생성할 수 있으며, 배열의 경우 스트림을 생성할 수 없음
  - Arrays.stream(배열) 메소드를 이용하여 스트림 객체를 리턴받을 수 있음
- 스트림 생성: 컬렉션의 목록을 스트림 객체로 변환
- 중간 연산: 생성된 스트림 객체를 사용하여 연산을 처리. 하지만 결과를 리턴하지는 않음. 필수는 아님. 중첩하여 사용 가능
- 종단 연산: 중개 연산에서 작업된 내용을 바탕으로 결과를 리턴


### 주요 스트림 연산자 종류

#### 중간 연산자

|연산자|설명|
|-|-|
| `filter()` | 데이터를 조건으로 거를 때 사용. Predicate 조건을 이용 |
| `map()` | 데이터를 특정 데이터로 변환. 값을 변환하기 위한 람다를 이용 |
| `flatMap()` | 스트림의 데이터를 잘게 쪼개서 새로운 스트림 반환 |
| `sorted()` | 데이터 정렬. Comparator를 이용 |
| `distinct()` | 데이터 내 중복 제거 |
| `limit()` | 첫 번째 요소부터 파라미터로 전달된 값까지의 요소로 이루어진 새로운 스트림 반환 |
| `skip()` | 첫 번째 요소부터 파라미터로 전달된 값만큼 요소를 제외한 나머지 요소로 이루어진 새로운 스트림 반환 |
| `peek()` | 결과 스트림으로부터 각 요소를 소모하여 추가로 명시된 동작을 수행하여 생성된 새로운 스트림을 반환 |

#### 종단 연산자

|연산자|설명|
|-|-|
| `forEach()` | for 루프를 수행하는 것처럼 각각의 항목을 꺼냄 |
| `toArray()` | 배열로 변환 |
| `reduce()` | 결과를 취합 |
| `collect()` | 원하는 타입으로 데이터를 반환 |
| `count()` | 해당 스트림의 요소 개수를 long 타입으로 반환 |
| `min() / max()` | 가장 작은/큰 값을 가지는 요소를 참조하는 Optional 객체 반환 |
| `anyMatch() / allMatch() / noneMatch()` | 일치하는 것을 찾음 | 
| `findFirst / findAny()` | 맨 처음이나 순서와 상관없는 것을 찾음 |


## 4. 메소드 참조

- 람다 표현식이 **하나의 메소드만** 사용하는 경우, 해당 메소드에 파라미터를 전달하여 사용하는 과정을 간단하게 표현하기 위해 활용한다


### 종류

| 종류 | 예 |
|-|-|
| static 메소드 참조 | `ContainingClass::staticMethodName` |
| 특정 객체의 인스턴스 메소드 참조 | `ContainingObject::instanceMethodName` |
| 특정 유형의 임의의 객체에 대한 인스턴스 메소드 참조 | `ContainingType::MethodName` |
| 생성자 참조 | `ClassName::new` |

### 람다식 표현과 메소드 참조 비교

```java
@Test
public void methodReferenceTest() {
  DoubleBinaryOperator pow1 = (a, b) -> Math.pow(a, b);
  DoubleBinaryOperator pow2 = Math::pow;
  
  double a = 3.0;
  double b = 5.0;
  
  double pow1Result = pow1.applyAsDouble(a, b);
  double pow2Result = pow2.applyAsDouble(a, b);
  
  assertThat(pow1Result, is(pow2Result));
}
```

### 생성자 참조

```java
@Test
public void constructorReferenceTest() {
  Function<String, StringBuilder> constructor1 = (s) -> new StringBuilder(s);
  Function<String, StringBuilder> constructor2 = StringBuilder::new;
  
  String s = "Asahi";
  
  String res1 = constructor1.apply(s).toString();
  String res2 = constructor2.apply(s).toString();
  
  assertThat(res1, is(res2));
}
```

### 스트림에서의 활용

```java
double[] values = {4, 16, 25};
Arrays.stream(values).map(e -> Math.sqrt(e)).forEach(e -> System.out.println(e));
Arrays.stream(values).map(Math::sqrt).forEach(System.out::println);;
```
