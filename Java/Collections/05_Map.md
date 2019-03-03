Map
========

- Key - Value 구조로 이루어진, 순서가 중요하지 않은 자료 구조
- Key는 중복을 허용하지 않음
- Map을 구현한 클래스는 매우 많으며, 그 중에서 HashMap, TreeMap, LinkedHashMap을 주로 사용한다.
- Hashtable 클래스도 존재하지만, 일반적인 Map 인터페이스를 구현한 클래스들과는 다르다
  - Map은 컬렉션 뷰를 사용하지만, Hashtable은 Enumeration 객체를 통해서 객체를 처리
  - Map은 키, 값, 키-값 쌍으로 데이터를 순환하여 처리할 수 있지만, Hashtable은 이 중에서 키-값 쌍으로 데이터를 순환하여 처리할 수 없다
  - Map은 이터레이션을 처리하는 도중에 데이터를 삭제하는 안전한 방법을 제공하지만, Hashtable은 그러한 기능을 제공하지 않는다

## Map 인터페이스 주요 메소드

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| V | put(K key, V value) | 첫 번째 매개 변수인 키를 갖는, 두 번째 매개 변수인 값을 갖는 데이터를 저장한다. 해당 키 값이 이미 존재하는 경우 값만을 변경한다 |
| void | putAll(Map<? extends K, ? extends V> m) | 매개 변수로 넘어온 Map의 모든 데이터를 저장한다 |
| V | get(Object key) | 매개 변수로 넘어온 키에 해당하는 값을 넘겨준다 |
| V | remove(Object key) | 매개 변수로 넘어온 키에 해당하는 값을 넘겨주며, 해당 키와 값은 Map에서 삭제한다 |
| Set<K> | keySet() | 키의 목록을 Set 타입으로 리턴한다 |
| Collection<V> | values() | 값으 목록을 Collection 타입으로 리턴한다 |
| Set<Map.Enrty<K,V>> | entrySet() | Map 안에 Entry라는 타입의 Set을 리턴한다 |
| int | size() | Map의 크기를 리턴한다 |
| void | clear() | Map의 내용을 지운다 |
| boolean | containsKey(Object k) | 매개 변수에 해당하는 키가 존재하는지 여부를 리턴 |
| boolean | containsValue(Object v) | 매개 변수에 해당하는 값이 존재하는지 여부를 리턴 |

## 1. HashMap

- HashMap의 주요 메소드는 대부분 Map 인터페이스에 정의되어 있음
- 직접 만든 클래스를 키로 사용하는 경우, Object 클래스의 hashCode() 메소드와 equals() 메소드를 잘 구현해놓아야 한다
- HashMap에 객체가 들어가면 hashCode() 메소드의 결과 값에 따른 버켓(Bucket)이라는 목록(List) 형태의 바구니가 만들어진다.
- 만약 서로 다른 키가 저장되었는데, hashCode() 메소드의 결과가 동일하다면, 이 버켓에 여러 개의 값이 들어갈 수 있다.
- 따라서, get() 메소드가 호출되면 hashCode()의 결과를 확인하고, 버켓에 들어간 목록에 데이터가 여러 개일 경우 equals() 메소드를 호출하여 동일한 값을 찾게 된다.


### 생성자

| 생성자 | 설명 |
|-|-|
| HashMap() | 16개의 저장 공간을 가지는 HashMap 객체를 생성 |
| HashMap(int initialCapacity) | 매개 변수만큼의 저장 공간을 가지는 HashMap 객체를 생성 |
| HashMap(int initialCapacity, folat loadFactor) | 첫 매개 변수의 저장 공간을 가지고, 두 번째 매개변수의 로드팩터를 가지는 HashMap 객체를 생성 |
| HashMap(Map<? extends K, ? extends V> m) | 매개 변수로 넘어온 Map을 구현한 객체에 있는 데이터를 갖는 HashMap 객체를 생성 |


## 2. TreeMap

- SortedMap 인터페이스를 구현하여, 데이터를 저장하면서 키를 정렬하는 Map
- 정렬 순서는 숫자 > 알파벳 대문자 > 알파벳 소문자 > 한글 순
- 키를 정렬해서 저장하므로 HashMap 보다는 느리다
- 키를 정렬하므로 firstKey(), lastKey(), higherKey(), lowerKey() 등과 같은 메소드가 제공된다