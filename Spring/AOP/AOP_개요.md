AOP(Aspect Oriented Programming)
========

## 1. 개요
- 관점 지향 프로그래밍
- AOP가 추구하는 것은 관심사의 분리(separate concerns)
- 로그, 트랜잭션, 보안 등 핵심 로직은 아니지만 이를 보완해주는 추가 기능으로, 시스템 전반에 산재하여 같은 목적이나 용도로 쓰이는 **공통 관심 기능** 영역을 핵심 로직으로부터 별도로 분리하여 일괄적으로 관리할 수 있도록 모듈화하는 프로그래밍 모델을 말한다
- AOP를 이용하게 되면 기존 코드의 수정 없이 분리된 관심사를 결합시킬 수 있게 된다

## 2. AOP 주요 개념

### 가. 관점(Aspect)
- 여러 객체에 공통으로 적용되는 공통 관심사
- 로그, 트랜잭션, 보안 등이 해당

### 나. 충고(Advice)
- **Aspect의 실제 구현체**로, 특정 joinpoint에 Aspect가 수행하는 행위
- 결합점과 결합하여 동작하는 시점에 따라 여러 타입으로 구분된다

| 타입 | 의미 |
|-|-|
| Before | joinpoint 전에 수행되는 advice |
| After returning | joinpoint가 성공적으로 리턴된 후에 동작하는 advice |
| After throwing | 예외가 발생하여 joinpoint가 빠져나갈 때 수행되는 advice |
| After (finally) | join point를 빠져나가는(정상적이거나 예외적인 반환) 방법에 상관없이 수행되는 advice |
| Around | jointpoint 전, 후에 수행되는 advice |

### 다. 결합점(Joinpoint)
- Aspect를 삽입하여 실행할 **어플리케이션의 특정 시점**을 말한다.
- 메소드 호출, 인스턴스의 생성시점, 예외가 발생하는 시점 등이 해당된다.

### 라. 포인트컷(Pointcut)
- **실제로 Advice가 적용될 Joinpoint**를 말한다.
- 하나 혹은 그 이상의 Joinpoint를 지정하여 Advice가 언제 실행될지를 지정하는데 사용한다.
- Spring은 기본적으로 AspectJ 포인트컷 표현식 언어를 사용한다

### 마. 도입(Introduction)
- 기존 클래스에 새로운 메소드나 속성을 추가
- Spring AOP는 Advice를 받는 대상 객체에 새로운 인터페이스를 추가할 수 있다

### 바. 대상 객체(Target Object)
- 하나 이상의 Advice를 받는 객체
- Spring AOP는 런타임 프록시를 사용하므로 대상 객체는 항상 프록시 객체가 된다

### 사. AOP 프록시(Proxy)
- 대상 객체(Target Object)에 Advice가 적용된 후 생성되는 객체
- Spring Framework의 AOP 프록시는 JDK Dynamic Proxy 혹은 CGLIB Proxy이다

### 아. 엮기(Weaving)
- 대상 객체에 Pointcut으로 선별된 Joinpoint에 Advice를 삽입하는 과정.
- 엮이는 시점에 따라 컴파일 타임, 로드 타임, 런타임 으로 나뉜다.

1. **컴파일 시 엮기(CTW)**
    - AspectJ에서 사용하는 방식
    - 핵심 로직을 구현한 자바 소스 코드를 컴파일할 때 알맞은 위치에 Aspect를 삽입하여 관점(Aspect)이 적용된 최종 바이너리를 만든다
    - ex) AspectJ
2. **클래스 로딩 시 엮기(LTW)**
    - AspectJ의 LTW(load-time weaving)나 AspectWekz에서 사용하는 방식
    - JVM이 클래스를 로딩할 때 라이브러리가 제공하는 Weaving Agent를 이용하여 클래스 정보를 변경
    - 로딩한 클래스의 바이너리 정보를 변경하여 공통 코드를 삽입한 새로운 클래스 바이너리 코드를 사용하도록 한다
3. **런타임 엮기(RTW)**
    - Spring AOP에서 사용하는 방식
    - 소스 코드나 바이너리 파일의 변경 없이 **프록시를 이용**하여 AOP를 제공
    - 프록시를 통해 핵심 관심사를 구현한 객체에 접근하여 핵심 관심사 실행 전후에 횡단 관심사를 실행한다
    - **메소드 호출시에만** Advice를 적용할 수 있기 때문에 필드값 변경과 같은 Joinpoint에 대해서는 적용할 수 없다

## 3. AOP 라이브러리 선택

### 가. Spring AOP
- 프록시 기반(JDK Dynamic Proxy와 CGLIB Proxy 방식)
- 순수 Java 구현으로 특별한 컴파일 과정이 필요 없고, 클래스 로더 계층을 제어 할 필요도 없다
- RTW로 처리 -> 메소드 호출시에만 Advice 적용 가능
- Spring Bean 내 작업만을 Advice 하는 경우 주로 선택

### 나. AspectJ
- 프록시가 아닌, 별도의 컴파일러나 Agent를 이용하여 대상 객체의 정보를 직접 조작
- 기본적으로 CTW로 처리. LTW로 변경 가능
- call, setter/getter, cflow 등의 다양한 포인트컷 지원
- Spring Container가 관리하지 않는 객체를 Advice 해야 할 경우 사용

## 4. Spring AOP의 구현

1. XML 스키마 기반의 POJO 클래스를 이용한 AOP 구현
2. AspectJ에서 정의한 @Aspect 어노테이션 기반의 AOP 구현
3. Spring AOP API를 이용한 AOP 구현(잘 사용되지 않음)

Spring AOP를 사용한다면 어떤 방식을 이용하더라도 내부적으로는 프록시를 이용하여 AOP가 구현되므로 @Aspect 어노테이션을 사용하더라도 메소드 호출과 관련된 Pointcut만 사용 가능하다

---

> 참고 자료
><br/>1. [전자정부프레임워크 AOP 서비스](http://www.egovframe.go.kr/wiki/doku.php?id=egovframework:rte:fdl:aop)
><br/>2. [티몬 개발자 블로그](https://tmondev.blog.me/220556587811)
><br/>3. [Spring Docs](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#aop)
