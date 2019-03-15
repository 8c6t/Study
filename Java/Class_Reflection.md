Class 클래스와 Reflection
========

## 1. Class 객체

- 클래스의 구조에 대한 정보를 가지고 있는 객체
- 대상 클래스 파일의 위치나 이름으로 해당 클래스의 정보를 얻어낸다
  - Class.forName("패키지_경로");
  - 대상_클래스.class;

> 자바 클래스 파일은 바이트 코드로 컴파일 되어 static 영역에 위치하기 때문에 클래스 이름만 알고 있다면, 해당 영역을 탐색하여 클래스에 대한 정보를 가져올 수 있다

## 2. 리플렉션

- 객체를 통해 클래스의 정보를 분석해 내는 프로그램 기법
- 자바에서는 클래스의 구조에 대한 정보를 가지고 있는 Class 객체를 통해 해당 클래스의 메소드, 타입, 변수, 생성자 등의 정보에 접근 및 제어를 가능하게 하는 자바 API를 말한다


## 3. 실증

### 대상 클래스

```java
public class ReflectionTarget {

  public int a = 1;
  private String b = "b";
  
  public String test1() {
    return "test1";
  }
  
  public String test2(String args) {
    return args;
  }
  
  public int test3(int a, String b) {
    return a + Integer.valueOf(b);
  }
 
  private char test4() {
    return 'A';
  }

}
```
### jUnit 테스트 클래스 초기 구성

```java
public class ReflectionTests {
  
  private Class clazz;
  private Object instance;
  
  @Before
  public void init() throws Exception {
    // 대상 클래스 파일의 위치나 이름으로 해당 클래스의 정보를 얻어낸다
    clazz = Class.forName("com.hachicore.test.ReflectionTarget");
    // this.clazz = ReflectionTarget.class;

    /**
     * 해당 클래스의 인스턴스를 생성
     * 리플렉션 대상 클래스의 정보를 알고 있다면, 직접 인스턴스를 생성하여 사용하여도 된다
     */
    this.instance = clazz.newInstance();
    // this.instance = new ReflectionTarget();
  }

}
```

### 테스트

#### 1. 필드 및 메소드 리스트 호출

```java
@Test
public void getFieldAndMethodListTests() throws Exception {
  
  List<String> fieldList = Arrays.asList(clazz.getFields()).stream().map(field -> field.getName()).collect(Collectors.toList());
  List<String> methodList = Arrays.asList(clazz.getMethods()).stream().map(method -> method.getName()).collect(Collectors.toList());
  
  assertThat(fieldList, hasItem("a"));
  assertThat(methodList, hasItems("test1", "test2", "test3"));

  // private 필드, 메소드는 가져올 수 없다
  assertFalse(fieldList.contains("b"));
  assertFalse(methodList.contains("test4"));
}
```

#### 2. Private 필드 값 호출

```java
@Test
public void getPrivateFieldValueTests() throws Exception {
  Field fieldB = clazz.getDeclaredField("b");
  fieldB.setAccessible(true);
  String b = String.valueOf(fieldB.get(instance));
  assertEquals(b, "b");
}
```
- `getDeclaredField()` 메소드를 이용해야 private(or protected) 필드를 가져올 수 있다
- `setAccessible()` 메소드를 이용해야 private(or protected) 필드 값에 접근할 수 있다

#### 3. Private 메소드 접근

```java
@Test
public void getPrivateMethodNameTest() throws Exception {
  List<String> methodList = Arrays.asList(clazz.getDeclaredMethods()).stream().map(method -> method.getName()).collect(Collectors.toList());
  assertThat(methodList, hasItems("test1", "test2", "test3", "test4"));
}
```
- `getDeclaredMethods()` 메소드를 이용해야 private(or protected) 된 메소드를 가져올 수 있다

#### 4. 필드 타입 호출

```java
@Test
public void fieldTypeTests() throws Exception {
  Field fieldA = clazz.getField("a");
  Object fieldType = fieldA.getType();
  assertEquals(fieldType, Integer.TYPE);
}
``` 

#### 3. 필드 값 호출

```java
@Test
public void getFieldValueTests() throws Exception {
  // 클래스 정보에서 어떤 필드에 접근할 것인지
  Field fieldA = clazz.getField("a");

  // 어떤 인스턴스의 필드 값을 가져올 것인지
  int a = (int) fieldA.get(instance);
  assertEquals(a, 1);
  
  // 필드 값의 타입을 지정해서 가져올 수도 있다
  a = fieldA.getInt(instance);
  assertEquals(a, 1);
}
```

#### 4. 메소드 호출

```java
@Test
public void invokeMethodWithoutArgsTests() throws Exception {
  Method method = clazz.getMethod("test1", null);
  String test1Result = String.valueOf(method.invoke(instance, null));
  assertEquals("test1", test1Result);
  
  // Apache MethodUtils 활용
  test1Result = String.valueOf(MethodUtils.invokeMethod(instance, "test1", null));
  assertEquals("test1", test1Result);
}

@Test
public void invokeMethodWittOneArgsTests() throws Exception {
  Method method = clazz.getMethod("test2", String.class);
  String test2Args = "reflection";
  
  String test2Result = String.valueOf(method.invoke(instance, test2Args));
  assertEquals(test2Args, test2Result);
  
  test2Result = String.valueOf(MethodUtils.invokeMethod(instance, "test2", new Object[] {test2Args} ));
  assertEquals(test2Args, test2Result);
}

@Test
public void invokeMethodWithMultipleArgsTests() throws Exception {
  Class[] test3ParamTypes = new Class[2];
  test3ParamTypes[0] = Integer.TYPE;
  test3ParamTypes[1] = String.class;
  
  Method method = clazz.getMethod("test3", test3ParamTypes);
  
  Object[] test3Params = {1, "3"};
  int test3Result = (int) (method.invoke(instance, test3Params));
  assertEquals(4, test3Result);
  
  test3Result = (int) MethodUtils.invokeMethod(instance, "test3", test3Params);
  assertEquals(4, test3Result);
}

@Test
public void invokePrivateMethodTests() throws Exception {
  Method method = clazz.getDeclaredMethod("test4", null);
  method.setAccessible(true);
  
  char test4Result = (char) method.invoke(instance, null);
  assertEquals('A', test4Result);
}
```



### Spring Container의 Bean 객체 메소드 동적 실행

```java
@Inject
private UserMapper mapper;

@Test
public void injectedObjectTests() throws Exception {
  // 메소드 명을 파라미터로 전달 받는다고 가정
  String methodName = "findOneById";

  List<String> methodList = Arrays.asList(mapper.getClass().getMethods()).stream().map(method -> method.getName()).collect(Collectors.toList());
  assertThat(methodList, hasItem(methodName));

  Method method = mapper.getClass().getMethod(methodName, String.class);
  User result = (User) method.invoke(mapper, new Object[] { "HiiragiHaru" });
  assertNotNull(result);
  
  result = (User) MethodUtils.invokeMethod(mapper, methodName, new Object[] { "Kuro" });
  assertNotNull(result);
}
```

- WAC에서 싱글톤 패턴으로 해당 객체의 인스턴스를 생성해서 관리하고 있기에, `newInstance()` 메소드나 생성자를 이용하여 인스턴스를 생성할 필요가 없다

--------

프론트단에서 메소드 명을 파라미터로 전달받아 동적으로 실행되어야 한다는 요구 사항이 있어 사용하게 되었다. 서비스 로직의 메소드 명이 프론트 선에서 공개가 된다는 것에 대해 긍정적으로 생각하지는 않지만 요구 사항이니(...)