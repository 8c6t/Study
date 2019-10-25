DispatcherServlet
========

스프링이 제공하는 서블릿 구현체로 스프링 MVC의 핵심 기술

## 1. DispatcherServlet 초기화

- 특정 타입에 해당하는 빈을 탐색하고, 해당 빈이 없는 경우 기본 전략을 사용
- 기본 전략 설정: DispatcherServlet.properties

### MultipartResolver

- 파일 업로드 요청 처리에 필요한 인터페이스
- HttpServletRequest를 MultipartHttpServletRequest로 변환하여 요청이 가지고 있는 File을 꺼낼 수 있는 API를 제공
- 기본 전략에서는 등록하지 않음
  - Apache Commons: `CommonMultipartResolver`
  - Servlet 3.0: `StandardServletMultipartResolver`
  - Boot는 Servlet 3.0 기반으로 기본으로 등록되어 있음

### LocaleResolver

- 클라이언트의 위치(Locale) 정보를 파악하는 인터페이스
- `AcceptHeaderLocaleResolver`: 요청의 Accept-Language 헤더를 보고 판단

### ThemeResolver

- 애플리케이션에 설정된 테마를 파악하고 변경할 수 있는 인터페이스


### HandlerMapping

- 요청을 처리할 핸들러를 찾는 인터페이스
- 핸들러 객체를 리턴
- `RequestMappingHandlermapping`: 어노테이션 기반 처리. 메소드가 핸들러가 됨
- `BeanNameUrlHandlerMapping`: 빈 이름 기반 처리. 클래스가 핸들러가 됨


### HandlerAdapter

- HandlerMapping이 찾아낸 핸들러를 처리하는 인터페이스
  - strategy 패턴 적용
  - 리플렉션을 이용하여 해당 핸들러 실행(invokeHandlerMethod)
- `RequestMappingHandlerAdapter`: 어노테이션 기반 처리
- `SimpleControllerHandlerAdapter`: 클래스를 핸들러로 쓰는 경우
- `HttpRequestHandlerAdapter`: 서블릿과 유사한 방식. 거의 사용되지 않음


### HandlerExceptionResolver

- 요청 처리 중에 발생한 에러를 처리하는 인터페이스


### RequestToViewNameTranslator

- 핸들러에서 뷰 이름을 명시적으로 리턴하지 않은 경우(void), 요청을 기반으로 뷰 이름을 판단하는 인터페이스


### ViewResolver

- 뷰 이름(String)에 해당하는 뷰를 찾아내는 인터페이스
- `InternalResourceViewResolver`: 기본 전략. JSP를 지원
  - 주로 Prefix, Suffix를 설정한 커스텀 ViewResolver를 사용


### FlashMapManager

- FlashMap 인스턴스를 가져오고 저장하는 인터페이스
  - 리다이렉션을 사용할 때 요청 매개변수를 사용하지 않고 데이터를 전달, 정리할 때 사용
- `SessionFlashMapManager`


## 2. DispatcherServlet 동작 순서

1. 요청 분석(로케일, 테마, 멀티파트 등)
2. 핸들러 매핑에게 요청을 위임하여 요청을 처리할 핸들러 탐색
3. 등록된 핸들러 어댑터 중 해당 핸들러를 실행할 수 있는 핸들러 어댑터 탐색
4. 찾아낸 핸들러 어댑터를 사용하여 핸들러 응답 처리
    - 핸들러의 리턴값을 보고 처리 방식 판단
    - 뷰 이름에 해당하는 뷰를 찾아서 모델 데이터를 렌더링
    - `@ResponseEntity`가 있다면 Converter를 사용해서 응답 본문을 생성
5. 예외 발생 시, 예외 처리 핸들러에 요청 처리 위임
6. 최종적으로 응답 전송

