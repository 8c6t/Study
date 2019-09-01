System 클래스
========

- 시스템에 대한 정보를 확인하는 클래스
- java.lang 패키지 내에 존재하는 클래스
  - java.lang 내의 클래스는 유일하게 import를 하지 않아도 사용 가능
- System 클래스는 생성자 없이 3개의 static 변수가 선언되어 있음

| 선언 및 리턴 타입 | 변수명 | 설명 |
|-|-|-|
| static PrintStream | err | 에러 및 오류를 출력할 때 사용 |
| static InputStream | in | 입력값을 처리할 때 사용 |
| static PrintStream | out | 출력값을 처리할 때 사용 |


ex) `System.out.println()`
- System 클래스의
- out 변수
- PrintStream의 println() 메소드


## 1. 제공 메소드 분류

1. 시스템 속성(Property)값 관리
2. 시스템 환경(Environment)값 조회
3. GC 수행
4. JVM 종료
5. 현재 시간 조회
6. 기타 관리용 메소드들


## 2. 시스템 속성(Property)값 관리

| 리턴 타입 | 메소드 이름 및 매개 변수 | 설명 |
|-|-|-|
| static String | clearProperty(String key) | key에 지정된 시스템 속성을 제거 |
| static Properties | getProperties() | 현재 시스템 속성을 Properties 클래스 형태로 제공 |
| static String | getProperty(String key) | key에 지정된 문자열로 된 시스템 속성값(value)을 얻는다 |
| static String | getProperty(String key, String def) | key에 지정된 문자열로 된 시스템 속성값(value)을 얻고, 만약 없으면, def에 지정된 값을 리턴 |
| static void | setProperties(Properties props) | Properties 타입으로 넘겨주는 매개변수에 있는 값들을 시스템 속성에 넣는다 |
| static String | setProperty(String key, String value) | key에 지정된 시스템 속성의 값을 value로 대체 |


## 3. 시스템 환경(Environment)값 조회

| 리턴 타입 | 메소드 이름 및 매개 변수 | 설명 |
|-|-|-|
| static Map<Stirng, String> | getenv() | 현재 시스템 환경에 대한 Map 형태의 리턴값을 받는다 |
| static String | getenv(String name) | 지정한 name에 해당하는 값을 받는다 |

- OS나 장비와 관련된 값
- Properties는 RW 작업이 가능하지만, 환경값인 env는 읽기만 가능하다


## 4. GC 수행

| 리턴 타입 | 메소드 이름 및 매개 변수 | 설명 |
|-|-|-|
| static void | gc() | 가비지 컬렉터를 실행 |
| static void | runFinalization() | GC 처리를 기다리는 모든 객체에 대하여 finalize() 메소드를 실행 |

- GC는 JVM이 알아서 관리하도록 할 것...


## 5. JVM 종료

| 리턴 타입 | 메소드 이름 및 매개 변수 | 설명 |
|-|-|-|
| static void | exit(int status) | 현재 수행중인 JVM을 멈춤 |

- 0인 경우에만 정상 종료. 그 외의 숫자는 비정상적인 종료를 의미


## 6. 현재 시간 조회

| 리턴 타입 | 메소드 이름 및 매개 변수 | 설명 |
|-|-|-|
| static long | currentTimeMills() | 현재 시간을 **밀리초** 단위로 리턴 |
| static long | nanoTime() | 현재 시간을 **나노초** 단위로 리턴 |

- UTC 기준으로 1970년 1월 1일 00:00부터 지금까지의 밀리초/나노초 단위의 차이를 출력
