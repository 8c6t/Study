Queue
========

- 한쪽 끝에서만 자료를 넣고 다른 한쪽 끝에서만 뺄 수 있는 자료구조
- FIFO(First In First Out)
- Queue를 확장하여 양 끝에서 자료를 넣고 양 끝에서 뺄 수 있는 Deque(Double-ended queue) 도 존재
- Queue, Deque의 구현은 LinkedList를 이용한다 -> `Queue<E> queue = new LinkedList<>()`

## LinkedList

- 현 노드의 값과 다음 노드의 메모리 주소를 가진 데이터를 이어나가며 List로 구현한 것
- 현 데이터가 다음 데이터의 주소를 가지고 있기 때문에 배열이나 ArrayList처럼 메모리를 연속으로 할당하여 사용하지 않아도 된다
- 데이터의 삽입/삭제 작업 시 ArrayList는 배열 크기를 재조정해야 하는 반면, LinkedList는 데이터를 연결시키기만 하면 되기에 ArrayList보다 빠르다
- 단, index를 이용해 데이터에 접근하는 경우 LinkedList는 순차적으로 접근을 해야 하기 때문에 느리다
- List 인터페이스 뿐만 아니라 Queue와 Deque 인터페이스도 구현하고 있다

### 생성자

| 생성자 | 설명 |
|-|-|
| LinkedList() | 비어있는 LinkedList 객체를 생성 |
| LinkedList(Collection<? extends E> c) | 매개 변수로 넘어온 컬렉션 객체의 데이터를 LinkedList에 담는다 |

- LinkedList는 각 데이터들이 앞뒤로 연결되는 구조이기 때문에 크기를 지정하지 않는다

### 주요 메소드

#### 데이터 추가

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| void | addFirst(Object) | LinkedList 객체의 가장 앞에 데이터를 추가 |
| boolean | peek() | 〃 |
| void | push() | 〃 |
| boolean | add() | LinkedList 객체의 가장 뒤에 데이터를 추가 |
| void | addLast() | 〃 |
| boolean | offer() | 〃 |
| boolean | offerLast() | 〃 |
| void | add(int, Object) | LinkedList 객체의 특정 위치에 데이터를 추가 |
| Object | set(int, Object) | LinkedList 객체의 특정 위치에 있는 데이터를 수정. 그리고, 기존에 있던 데이터를 리턴 |
| boolean | addAll(Collection) | 매개 변수로 넘긴 컬렉션의 데이터를 추가 |
| boolean | addAll(int, Collection) | 매개 변수로 넘긴 컬렉션의 데이터를 지정된 위치에 추가 |

- LinkedList가 여러 인터페이스를 구현하기에 중복된 기능을 수행하는 메소드가 존재
- 내부적으로는 add가 붙은 메소드가 호출되도록 구현되어 있으므로, add가 붙은 메소드를 이용하는 것이 바람직함


#### 데이터 얻기

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| Object | getFirst() | LinkedList 객체의 가장 앞에 있는 데이터를 리턴 |
| Object | peekFirst() | 〃 |
| Object | peek() | 〃 |
| Object | element() | 〃 |
| Object | getLast() | LinkedList 객체의 가장 뒤에 있는 데이터를 리턴 |
| Object | peekLast() | 〃 |
| Object | get(int) | LinkedList 객체의 지정한 위치에 있는 데이터를 리턴 |

- 내부적으로 get이 붙은 메소드들을 호출하도록 구현되어 있음


#### 데이터 확인

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| boolean | contains(Object) | 매개 변수로 넘긴 데이터가 있을 경우 true 리턴 |
| int | indexOf(Object) | 매개 변수로 넘긴 데이터의 위치를 앞에서부터 검색하여 리턴. 없을 경우 -1 리턴 |
| int | lastIndexOf(Object) | 매개 변수로 넘긴 데이터의 위치를 끝에서부터 검색하여 리턴. 없을 경우 -1 리턴 |


#### 데이터 삭제

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| Object | removeFirst() | LinkedList 객체의 가장 앞에 있는 데이터를 삭제하고 리턴 |
| Object | remove() | 〃 |
| Object | poll() | 〃 |
| Object | pollFirst() | 〃 |
| Object | pop() | 〃 |
| Object | removeLast() | LinkedList 객체의 가장 뒤에 있는 데이터를 삭제하고 리턴 |
| Object | pollLast() | 〃 |
| Object | remove(int) | 매개 변수에 지정된 위치에 있는 데이터를 삭제하고 리턴 |
| boolean | remove(Object) | 매개 변수로 넘겨진 객체와 동일한 데이터 중 앞에서부터 가장 처음에 발견된 데이터를 삭제 |
| boolean | removeFirstOccurrence(Object) | 〃 |
| boolean | removeLastOccurrence(Object) | 매개 변수로 넘겨진 객체와 동일한 데이터 중 뒤에서부터 가장 처음에 발견된 데이터를 삭제 |

- 내부적으로 removeFirst(), removeLast() 메소드를 호출


#### Iterator 객체 리턴

| 리턴 타입 | 메소드 이름, 매개 변수 | 설명 |
|-|-|-|
| ListIterator | listIterator(int) | 매개 변수에 지정된 위치부터의 데이터를 검색하기 위한 ListIterator 객체를 리턴 |
| Iterator | descendingIterator() | LinkedList의 데이터를 끝에서부터 검색하기 위한 Iterator 객체를 리턴 |

- ListIterator는 Iterator 인터페이스가 다음 데이터만을 검색할 수 있다는 점을 보완하여, 이전 데이터도 검색할 수 있도록 한 것. previous() 메소드를 사용하여 이전 데이터를 확인할 수 있음

