JVM
========

## 1. JVM, JRE, JDK

### JVM(Java Virtual Machine)

- 자바 바이트 코드를 실행하는 표준이자 구현체
  - JVM 스펙 자체는 표준
  - 오라클, 아마존 등의 특정 벤더가 구현한 JVM을 사용
- 자바 바이트 코드(`.class` 파일)를 해당 OS에 특화된 코드(네이티브 코드)로 변환하여 실행

### JRE(Java Runtime Environment)

- JVM + 라이브러리
- 자바 애플리케이션을 실행할 수 있도록 구성된 배포판
- JVM과 핵심 라이브러리 및 JRE에서 사용하는 프로퍼티 세팅, 리소스 파일을 가지고 있음
- 개발 관련 도구는 포함되지 않음

### JDK(Java Development Kit)

- JRE + 개발 툴


## 2. JVM 구조

![jvm](https://www.javainterviewpoint.com/java-virtual-machine-architecture-in-java/jvm-architecture/)

- Class Loader
- Runtime Data Area(메모리)
- Execution Engine
- Native Method Interface(JNI)
- Native Method Library


## 3. Class Loader

- `.class` 파일에서 바이트 코드를 읽고 메모리에 저장
- 로딩, 링크, 초기화 순으로 진행됨

### 로딩

- 클래스 로더가 `.class` 파일을 읽고 그 내용에 따라 적절한 바이너리 데이터를 만들고 **메모리의 Method 영역**에 저장
- Method 영역에 저장되는 데이터
- 로딩이 끝나면 **해당 클래스 타입의 Class 객체를 생성하여 메모리의 Heap 영역에 저장**


### 링크

- Verify, Prepare, Resolve(Optional) 세 단계로 나뉨
- Verify: `.class` 파일 형식이 유효한지 체크
- Prepare: 클래스 변수(static 변수)와 기본값에 필요한 메모리를 준비하는 과정
- Resolve: 심볼릭 메모리 레퍼런스를 Method 영역에 있는 실제 레퍼런스(Heap에 위치)로 교체


### 초기화

- Static 변수의 값을 할당
- static 블럭이 있다면 이 때 실행됨


## 4. Runtime Data Area

### Method

- 클래스 수준의 정보를 저장하는 영역
  - FQCN(Full Qualified Class Name)
    - 패키지 이름 + 풀 패키지 경로 + 클래스 이름
  - 타입 정보(class, interface, enum)
  - 메소드와 변수와 관련된 정보
- 모든 스레드에서 공유


### Heap

- new 연산자로 생성된 객체와 배열을 저장하는 영역
- Method 영역에 존재하는 클래스만 생성 가능
- GC에 의해 중심적으로 관리되는 영역
- 모든 스레드에서 공유


### Stack

- 지역 변수, 파라미터, 리턴 값, 연산에 사용되는 임시 데이터 등이 저장되는 영역
- 쓰레드 마다 런타임 스택을 만들고, 그 안에 메소드 호출을 스택 프레임이라 부르는 블럭으로 쌓음
- 쓰레드가 종료되면 런타임 스택도 사라짐


### PC Register

- 쓰레드 마다 쓰레드 내 현재 실행할 스택 프레임을 가리키는 포인터가 생성됨
- 각 스레드마다 생성됨


### Native Method Stack

- 자바 외의 언어로 작성된 네이티브 코드를 위한 메모리 영역
- 각 스레드마다 생성됨


## 5. Execution Engine

메모리 영역에 할당된 바이트 코드를 해석하고 실행하는 영역으로, 바이트 코드를 읽어 조각 단위로 실행

### Interpreter

- 바이트 코드를 한 줄씩 해석하여 실행
- 반복되는 코드일지라도 매번 새 해석이 필요함
 
### JIT Compiler

- 인터프리터가 반복되는 코드를 발견하면 JIT 컴파일러로 반복되는 코드를 모두 네이티브 코드로 변경
- 이후 인터프리터는 네이티브 코드로 컴파일 된 코드를 바로 사용

### Garbage Collctor

- 더 이상 참조되지 않는 객체를 모아서 정리하는 역할을 수행
- Heap, Stack, Method 영역이 GC의 대상이 됨


## 6. Java Native Interface(JNI) / Native Method Libraries


### Java Native Interface(JNI)

- 실행 엔진에 필요한 네이티브 라이브러리들을 제공

### Native Method Libraries

- Native Libraries의 집합이며 실행 엔진에 필수
