자바 컬렉션
========

자바에서 목록성 데이터를 처리하는 자료 구조. 크게 List, Set, Queue, Map로 분류할 수 있다


## 1. 구조

![java_collection](https://www.javatpoint.com/images/java-collection-hierarchy.png)

![java_map](https://www.javatpoint.com/images/core/java-map-hierarchy.png)

- Map의 경우 Collection과는 별개의 인터페이스로 선언되어 있음
- 데이터 탐색의 표준화를 위한 Iterable 인터페이스를 구현하고 있음

### ※ Iterable

- Iterable 인터페이스에는 Iterator 인터페이스를 리턴하는 iterator() 메소드만이 존재
- Iterator 인터페이스에는 추가 데이터가 있는지 여부를 확인하는 hasNext(), 현재 위치를 다음 요소로 넘기고 그 값을 리턴하는 next(), 데이터를 삭제하는 remove() 메소드가 존재
- Iterator 객체를 만들어서 사용하기 때문에 for문을 이용하여 접근하는 것보다는 느리다

## 2. Collection 인터페이스 주요 메소드

Map을 제외한 자료 구조형들은 모두 Collection을 구현하고 있으므로 해당 메소드들을 이용할 수 있다.

| 리턴 타입 | 메소드 이름, 매개변수 | 설명 |
|-|-|-|
| boolean | add(E e) | 요소를 추가 |
| boolean | addAll(Collection) | 매개 변수로 넘어온 컬렉션의 모든 요소를 추가 |
| void | clear() | 컬렉션에 있는 모든 요소 데이터를 지운다 |
| boolean | contains() | 매개 변수로 넘어온 객체가 해당 컬렉션에 있는지 확인. 동일한 값이 존재하면 true 리턴 |
| boolean | containsAll(Collection) | 매개 변수로 넘어온 객체들이 해당 컬렉션에 있는지 확인. 매개 변수로 넘어온 컬렉션에 있는 요소들과 동일한 값들이 모두 있으면 true 리턴 |
| boolean | equals(Object) | 매개 변수로 넘어온 객체와 같은 객체인지 확인 |
| int | hashCode() | 해시 코드 값을 리턴 |
| boolean | isEmpty() | 컬렉션이 비어있는지 확인 |
| Iterator | iterator() | 데이터를 한 건씩 처리하기 위한 Iterator 객체를 리턴 |
| boolean | remove(Object) | 매개 변수와 동일한 객체를 삭제 |
| boolean | removeAll(Collection) | 매개 변수로 넘어온 객체들을 해당 컬렉션에서 삭제 |
| boolean | retainAll(Collection) | 매개 변수로 넘어온 객체들만을 컬렉션에 남겨둔다 |
| int | size() | 요소의 개수를 리턴 |
| Object[] | toArray() | 컬렉션에 있는 데이터들을 배열로 복사한다 |
| `<T> T[]` | toArray(T[]) | 컬렉션에 있는 데이터들을 지정한 타입의 배열로 복사한다 |
