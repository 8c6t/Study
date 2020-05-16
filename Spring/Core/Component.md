컴포넌트와 컴포넌트 스캔
========

## @Component

클래스를 IoC 컨테이너에 Bean으로 등록하기 위해 사용하는 애노테이션

### ※ @Bean과 @Component의 차이

IoC 컨테이너에 Bean을 등록하는 기능은 동일하나, 용도가 다르다.

- @Bean: 직접 제어할 수 없는 외부 라이브러리 등을 Bean으로 등록하고자 할 때 사용. **Target이 METHOD에 한정됨**
- @Component: 직접 제어 가능한 클래스를 Bean으로 등록할 때 사용. **Target이 TYPE에 한정됨(클래스 위에서만 선언 가능)**


## @ComponentScan

**특정 패키지와 그 하위**의 모든 클래스 중에 `@Component` 애노테이션을 사용한 클래스를 Bean으로 등록하기 위해 사용하는 애노테이션

## 설정

- XML: `context:component-scan`
- Java: `@ComponentScan`


### 스캔 위치 설정

- basePackage: 문자열로 입력한 패키지를 기준으로 스캔
- basePackageClasses: 해당 클래스가 속한 패키지를 기준으로 스캔
- 기본 설정은 `@ComponentScan` 애노테이션을 가진 Configuration이 속한 패키지가 시작 지점이 됨
- 스프링 부트 프로젝트의 경우 `@SpringBootApplication` 애노테이션 내에 `@Configuration`, `@ComponentScan` 애노테이션이 포함됨


### 필터

- includeFilters: 특정 조건을 만족하는 클래스만을 스캔
- excludeFilters: 특정 조건을 만족하는 클래스를 제외하고 스캔
  - FilterType.ANNOTATION
  - FilterType.ASPECTJ
  - FilterType.ASSIGNABLE_TYPE
  - FilterType.REGEX
  - FilterType.CUSTOM