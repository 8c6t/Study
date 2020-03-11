IoC 컨테이너
========

## 1. IoC

- Inversion of Control, 의존 관계 주입(Dependency Injection)이라고도 한다
- 어떤 객체가 사용하는 의존 객체를 직접 만들어 사용하지 않고, 외부로부터 주입 받아 사용하는 기법

## 2. 스프링 IoC 컨테이너

- 빈의 생성과 관계설정 같은 제어를 담당하는 IoC 객체
  - 빈: 스프링 IoC 컨테이너에 저장되어 관리되는 객체
- XML이나 자바로 작성된 빈 설정 파일로부터 빈 정의를 읽어 빈 인스턴스 생성, 의존 관계 설정 및 빈 제공
- `BeanFactory` 라는 최상위 인터페이스가 있으며, BeanFactory을 상속받은 `ApplicationContext`를 주로 사용

### BeanFactory

- Spring 설정 파일에 등록된 Bean 객체를 생성하고 관리하는 가장 기본적인 Container 기능만 제공
- Container 구동 시 Bean 객체를 생성하지 않고, 클라이언트의 요청에 의해서만 객체를 생성함(lazy loading)

### ApplicationContext

- Container가 구동되는 시점에 Bean 객체를 생성함(eager loading)
- ApplicationContext는 리소스 로딩 기능, 이벤트 발행 기능, 메시지 소스 처리 기능 등을 추가적으로 제공


## 3. ApplicationContext와 빈 설정

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) throws BeansException {

        // XML 설정 이용 시
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");

        // Java 설정 이용 시
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);

        String[] beanDefinitionNames = context.getBeanDefinitionNames();
        System.out.println(Arrays.toString(beanDefinitionNames));

        DemoService bookService = (DemoService) context.getBean("demoService");
        System.out.println(bookService.bookRepository != null);

    }

}
```

- XML 설정을 이용하는 경우 `ClassPathXmlApplicationContext`
- Java 설정을 이용하는 경우 `AnnotationConfigApplicationContext`

### 빈 객체

```java
// DemoService
@Service
public class DemoService {

  @Autowired
  DemoRepository demoRepository;

  public void setDemoRepository(DemoRepository demoRepository) {
    this.demoRepository = demoRepository;
  }
}

// DemoRepository
@Repository
public class DemoRepository { }
```


### resource/application.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <bean id="demoRepository"
          class="com.hachicore.springapplicationcontext.DemoRepository">
    </bean>

    <bean id="demoService"
          class="com.hachicore.springapplicationcontext.DemoService">
        <property name="demoRepository" ref="demoRepository" />
    </bean>

    <context:component-scan base-package="com.hachicore.springapplicationcontext" />

</beans>
```

### ApplicationConfig.java

```java
@Configuration
@ComponentScan(basePackageClasses = DemoApplication.class)
public class ApplicationConfig {

  @Bean
  public DemoRepository demoRepository() {
    return new DemoRepository();
  }

  @Bean
  public DemoService demoService() {
    DemoService demoService = new DemoService();
    return demoService;
  }

}
```

### 빈 등록(컴포넌트 스캔)

- 특정 패키지 이하의 모든 클래스 중 `@Component` 어노테이션이 사용된 클래스를 빈으로 자동 등록
  - `@Repository`, `@Service`, `@Controller`, `@Configuration`
- XML 설정을 이용하는 경우 `context:component-scan`
- Java 설정을 이용하는 경우 `@ComponentScan`
  - `basePackage`: 문자열. 해당 경로상의 패키지가 컴포넌트 스캔 대상
  - `basePackageClasses`: 클래스. 해당 클래스가 존재하는 패키지가 컴포넌트 스캔 대상
