Pug 기초
========

- 자바스크립트를 사용해서 HTML을 렌더링하는 템플릿 엔진 중 하나
- 문법이 간단하여 코드량이 줄어들지만, 기존 HTML과 문법이 많이 달라 호불호가 갈림

## 1. HTML 표현

- 화살 괄호(`<>`)와 닫는 태그가 없음
- 탭 또는 스페이스로만 태그의 부모-자식 관계를 규명
  - 모든 파일에 동일한 종류의 들여쓰기를 적용해야 함


### 가. 속성 표현

```html
<!-- Pug -->
input(type='checkbox', name='agreement' checked)

<!-- HTML -->
<input type="checkbox" name="agreement" checked="checked" />
```
- 태그명 뒤에 소괄호로 묶어서 적음
- 쉼표를 추가하여 속성을 구분하여도 되고, 사용하지 않아도 된다

```html
<!-- Pug -->
- var authenticated = true
body(class=authenticated ? 'authed' : 'anon')

<!-- HTML -->
<body class="authed"></body>
```
- 자바스크립트 표현도 사용 가능

### 나. id, class 표현

```html
<!-- Pug -->
#content
.wrapper
span#selected
p.hidden.full
- var classes = ['foo', 'bar', 'baz']
a(class=classes)
a.bang(class=classes class=['bing'])

<!-- HTML -->
<div id="content"></div>
<div class="wrapper"></div>
<span id="selected"></span>
<p class="hidden full"></p>
<a class="foo bar baz"></a>
<a class="bang foo bar baz bing"></a>
```
- **div 태그는 div 문자를 생략할 수 있음**
- `#`: id
- `.`: class
- 자바스크립트 표현도 사용 가능

## 다. HTML 텍스트 표현

```html
<!-- Pug -->
p This is plain old <em>text</em> content.
button(type='submit') 전송

<!-- HTML -->
<p>This is plain old <em>text</em> content.</p>
<button type='submit'>전송</button>

<!-- 여러 줄 입력 -->
<!-- Pug -->
p
  | The pipe always goes at the beginning of its own line,
  | not counting indentation.

<!-- HTML -->
<p>The pipe always goes at the beginning of its own line, not counting indentation.</p>
```
- 태그 또는 속성 뒤에 한 칸을 띄고 입력
- 여러 줄을 입력할 경우 파이프(`|`) 사용


## 라. style, script 태그 작성

```html
<!-- Pug -->
style.
  h1 {
    font-size: 30px;
  }
script.
  if (usingPug)
    console.log('you are awesome')
  else
    console.log('use pug')

<!-- HTML -->
<style>
  h1 {
    font-size: 30px;
  }
</style>
<script>
  if (usingPug)
    console.log('you are awesome')
  else
    console.log('use pug')
</script>
```
- style, script 태그 뒤에 점(`.`)을 붙임

## 2. 변수

### 가. 서버측

- 자바스크립트 변수를 템플릿에 렌더링 가능
- res.render(템플릿, 변수 객체) 호출 시 보내는 변수를 Pug가 처리함
  - 두번째 파라미터에 객체를 넣는 대신, `res.locals` 객체를 사용해서 변수를 넣을 수도 있음
- Pug 엔진에서 `res.locals` 객체를 읽어서 변수를 삽입함
  - 라우터 이외의 다른 미들웨어에서도 접근 가능

```js
router.get('/', (req, res, next) => {
  res.render('main', { title: 'Hachicore' });
});

// 위와 동일
router.get('/', (req, res, next) => {
  res.locals.title = 'Hachicore';
  res.render('index');
});
```

### 나. 프론트

```html
<!-- Pug -->
h1= title
p Welcome to #{title}
button(class=title, type='submit') 전송
input(placeholder=title + ' 연습')

<!-- HTML -->
<h1>Hachicore</h1>
<p>Welcome to Hachicore</p>
<button class="hachicore" type="submit">전송</button>
<input placeholder="hachicore 연습" />
```

- 변수를 텍스트로 사용하고 싶다면 태그 뒤에 `=`를 붙인 후 변수 입력
- 속성에도 `=`를 붙인 후 변수 사용 가능
- 텍스트 중간에 변수를 넣으려면 `#{변수}`


### 다. 변수 직접 선언

```html
<!-- Pug -->
- var title = 'Hachicore'
- var character = 'Haru'
p #{title}과 #{character}

<!-- HTML -->
<p>Hachicore과 Haru</p>
```
- `-`를 먼저 입력하면 뒤에 자바스크립트 구문 작성 가능


## 3. 특수문자 이스케이프

```html
<!-- Pug -->
div(escaped="<code>")
div(unescaped!="<code>")

<!-- HTML -->
<div escaped="&lt;code&gt;"></div>
<div unescaped="<code>"></div>
```

- Pug는 기본적으로 변수의 특수문자를 HTML 엔티티로 이스케이프 함
- 변환을 원치 않는다면 `=` 대신 `!=` 사용


## 4. 반복문

```html
<!-- Pug -->
- var characters = ['Haru', 'Kuro', 'Asahi', 'Chiwa']
ul
  each character, idx in characters
    li= `${idx + 1}등 ${character}`

<!-- HTML -->
<ul>
  <li>1등 Haru</li>
  <li>2등 Kuro</li>
  <li>3등 Asahi</li>
  <li>4등 Chiwa</li>
</ul>
```
- each문으로 반복문 사용
  - 인덱스 사용 가능
- **※ 자바스크립트의 템플릿 문자열 사용 가능**


## 5. 조건문

### if문

```html
<!-- Pug -->
- var user = { description: 'foo bar baz' }
- var authorised = false
#user
  if user.description
    h2.green Description
    p.description= user.description
  else if authorised
    h2.blue Description
    p.description.
      User has no description,
      why not add one...
  else
    h2.red Description
    p.description User has no description

<!-- HTML -->
<div id="user">
  <h2 class="green">Description</h2>
  <p class="description">foo bar baz</p>
</div>
```

### case문
```html
<!-- Pug -->
- var friends = 10
case friends
  when 0
    p you have no friends
  when 1
    p you have a friend
  default
    p you have #{friends} friends

<!-- HTML -->
<p>you have 10 friends</p>
```

## 6. include

### index.pug
```html
doctype html
html
  include includes/head.pug
  body
    h1 My Site
    p Welcome to my super lame site.
    include includes/foot.pug
```

### includes/head.pug
```html
head
  title My Site
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')
```

### includes/foot.pug
```html
footer#footer
  p Copyright (c) foobar
```

### HTML 결과물
```html
<!DOCTYPE html>
<html>

<head>
  <title>My Site</title>
  <script src="/javascripts/jquery.js"></script>
  <script src="/javascripts/app.js"></script>
</head>

<body>
  <h1>My Site</h1>
  <p>Welcome to my super lame site.</p>
  <footer id="footer">
    <p>Copyright (c) foobar</p>
  </footer>
</body>

</html>
```
- pug 확장자는 생략하여도 된다


## 7. extends와 block

### layer.pug
```html
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
```

### index.pug

```html
extends layout

block content
  h1= title
  p Welcome to #{title}
```

### HTML 결과
```html
<!DOCTYPE html>
<html>

<head>
  <title>Hachicore</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
</head>

<body>
  <h1>Hachicore</h1>
  <p>Welcome to Hachicore</p>
</body>

</html>
```

- 레이아웃이 될 파일에는 공통된 마크업을 넣되, 페이지마다 달라지는 부분을 block으로 비워둠
  - `block [블록명]`
- block이 되는 파일에서는 extends 키워드로 레이아웃 파일을 지정하고 block 부분을 넣어줌
  - block 선언보다 한 단계 더 들여쓰기 되어 있어야 함

--------

1. [Pug 공식 문서](https://pugjs.org/api/getting-started.html)