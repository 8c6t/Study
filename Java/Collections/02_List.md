List
========

- 중복을 허용하며, 순서가 중요한 자료 구조
- List를 구현한 클래스는 매우 많으며, 그 중에서 ArrayList, Vector, Stack, LinkedList를 주로 사용한다.
- ArrayList와 Vector는 확장 가능한 배열로서 기능 및 사용법에 큰 차이는 없으며, 차이첨으로는 ArrayList는 Thread safe하지 않고, Vector는 Thread safe하다는 점이다.
- Stack은 LIFO를 지원하기 위한 클래스로, Vector 클래스를 확장하여 만들어졌다.
- LinkedList는 List에도 속하지만 Queue에도 속한다. LinkedList에 대한 소개는 Queue에서

## 1. ArrayList

- 확장 가능한 배열로서 대괄호를 사용하지 않고 메소드를 사용하여 객체를 관리한다.

### 생성자

| 생성자 | 설명 |
|-|-|
| ArrayList() | 객체를 저장할 공간이 10개인 ArrayList를 만든다 |
| ArrayList(Collection<? extends E> c) | 매개 변수로 넘어온 컬렉션 객체가 저장되어 있는 ArrayList를 만든다 |
| ArratList(int initialCapacity) | 매개 변수로 넘어온 initialCapacity 개수만큼의 저장 공간을 갖는 ArrayList를 만든다 |

**※ Thread safe한 ArrayList 객체 생성**

`List<T> list = Collections.synchronizedList(new ArrayList<T>(...))`

### 주요 메소드

#### 데이터 추가 및 변경

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| boolean | add(E e) | 매개 변수로 넘어온 데이터를 가장 끝에 담는다 |
| void | add(int index, E e) | 매개 변수로 너머온 데이터를 지정된 index 위치에 담는다 |
| boolean | addAll(Collection<? extends E> c) | 매개 변수로 넘어온 컬렉션 데이터를 가장 끝에 담는다 |
| boolean | addAll(int index, Collection<? extends E> c) | 매개 변수로 넘어온 컬렉션 데이터를 index에 지정된 위치부터 담는다 |
| E | set(int index, E element) | 지정한 위치에 있는 데이터를 두 번째 매개 변수로 넘긴 값으로 변경한다. 그리고 해당 위치에 있던 데이터를 리턴한다 |

#### 데이터 얻기

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| int | size() | ArrayList 객체에 들어가 있는 데이터의 개수를 리턴 |
| E | get(int index) | 매개 변수에 지정한 index 위치에 있는 데이터를 리턴 |
| int | indexOf(Object o) | 매개 변수로 넘어온 객체와 동일한 데이터의 인덱스 값을 리턴 |
| int | lastIndexOf(Object o) | 매개 변수로 넘어온 객체와 동일한 마지막 데이터의 위치를 리턴 |


#### 배열 생성

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| Object[] | toArray() | ArrayList 객체에 있는 값들을 Object[] 타입의 배열로 만든다 |
| `<T> T[]` | toArray(T[] a) | ArrayList 객체에 있는 값들을 매개 변수로 넘어온 T 타입의 배열로 만든다 |

- toArray() 메소드는 Object 타입의 배열로만 리턴을 하므로, 제네릭을 사용해서 선언한 ArrayList 객체를 배열로 생성할 때는 변환하려는 타입의 배열을 매개변수로 지정해주는 2번쨰 메소드를 이용하는 것이 좋다
- 이 때, 매개변수로 넘긴 배열 객체에 값을 담아주게 되는데
  - 배열의 크기가 ArrayList와 같은 경우 값이 정상적으로 채워진다
  - 배열의 크기가 ArrayList의 크기보다 작은 경우 모든 값이 null로 채워진다
  - 배열의 크기가 ArrayList의 크기보다 큰 경우 초과되는 index의 값이 null로 채워진다
- 따라서 크기가 0인 배열을 매개변수로 하여 타입만을 지정해주는 것이 좋다

#### 데이터 삭제

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| void | clear() | 모든 데이터 삭제 |
| E | remove(int index) | 매개 변수에서 지정한 위치에 있는 데이터를 삭제하고, 삭제한 데이터를 리턴 |
| boolean | remove(Object o) | 매개 변수에서 넘어온 객체와 동일한 **첫 번째 데이터를 삭제** |
| boolean | removeAll(Collection<?> c) | 매개 변수로 넘어온 컬렉션 객체에 있는 데이터와 동일한 **데이터를 모두 삭제** |


## 2. Stack

- 한쪽 끝에서만 자료를 넣고 뺄 수 있는 자료구조
- LIFO(Last In First Out)
- Vector 클래스를 상속받아 구현된 자료 구조로서, 원 취지를 고려하면 Vector에 속해서는 안 되지만 하위 호환성을 위해 상속관계를 유지하고 있다

### 생성자

| 생성자 | 설명 |
|-|-|
| Stack() | 아무 데이터도 없는 Stack 객체를 생성 |


### 주요 메소드

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| boolean | empty() | 스택이 비어있는지 확인 |
| E | peek() | 객체의 가장 위에 있는 데이터를 리턴 |
| E | pop() | 객체의 가장 위에 있는 데이터를 지우고, 리턴 |
| E | push(E item) | 매개 변수로 넘어온 데이터를 가장 위에 저장 |
| E | search(Object o) | 매개 변수로 넘어온 데이터를 가장 위에 저장 |

