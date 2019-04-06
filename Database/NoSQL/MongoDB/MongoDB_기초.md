MongoDB 기초
========

| RDBMS | MongoDB(NoSQL) |
|-|-|
| 테이블 | 컬렉션 |
| 로우 | 다큐먼트 |
| 컬럼 | 필드 |


## 1. 명령어

| 명령어 | 설명 |
|-|-|
| use DB명 | 해당 DB 접속. 없을 시 DB 생성 |
| db | 현재 사용중인 DB 확인 |
| db.stats() | DB 상태 확인 |
| show dbs | DB 목록 확인<br>데이터가 한 개 이상 존재해야 목록에 표시됨 |
| db.createCollection('컬렉션명') | 컬렉션 생성<br>다큐먼트를 넣는 순간 컬렉션도 자동으로 생성되므로 별도로 컬렉션을 생성하지 않아도 된다 |
| show collections | DB의 컬렉션 목록 확인 |
| show tables | show collections와 동일 |
| db.컬렉션명.drop() | 해당 컬렉션 삭제 |


## 2. CRUD 작업

### 가. CREATE

- `save()` 혹은 `insert()` 메소드 사용
- `db.컬렉션명.save(변수명 or JSON)`, `db.컬렉션명.insert(변수명 or JSON)` 구조
  - `insert()`: _id가 동일한 값을 저장하려 할 경우 오류 발생(Duplicate key error index)
  - `save()`: _id가 동일한 값을 저장하려 할 경우 기존 데이터를 덮어씌움. 존재하지 않는다면 insert 기능을 사용하여 데이터 저장(UPSERT)
- 하나의 JSON 데이터를 document로 칭함
- 컬렉션에 컬럼을 정의하지 않아도 되므로 컬렉션에는 아무런 데이터나 삽입 가능
- MongoDB는 자바스크립트 문법을 사용하므로 자바스크립트의 자료형을 따름
  - **Binary Data**, **ObjectId**, Int, Long, Decimal, **Timestamp**, JavaScript 등의 추가적인 자료형 존재
  - Undefined와 Symbol은 자료형으로 사용하지 않음
- 복수의 데이터 삽입 시 배열 이용
  - `save([ {}, {}, ... ])`

```js
db.users.save({
  name: 'zero',
  age: 24,
  married: false,
  comment: 'mongodb',
  createdAt: new Date()
});

db.articles.insert(
  [{
    title : "article01",
    content : "content01",
    writer : "Velopert",
    likes : 0, 
    comments : [] 
  }, 
  {
    title : "article02",
    content : "content02",
    writer : "Alpha",
    likes : 23,
    comments : [{name : "Bravo", message : "Hey Man!"}]
  },
  {
    title : "article03",
    content : "content03",
    writer : "Bravo",
    likes : 40,
    comments : [{name : "Charlie", message : "Hey Man!"}, {name : "Delta", message : "Hey Man!"}]
  }]
);
```

### 나. READ

- `find()` 혹은 `findOne()` 메소드 사용
  - `findOne()`: `find()` 결과 중 가장 첫번째에 위치한 데이터만 반환
- `db.컬렉션명.find({param1}, {param2})` 구조
  - 첫번째 파라미터: WHERE 조건. 조건을 연속으로 나열하면 AND 연산이 자동으로 이루어짐
  - 두번째 파라미터: 출력할 필드명. 생략 시 모든 필드 출력. -> `{ 필드명: boolean, 필드명: boolean ... }`

#### ※ 함께 사용하는 메소드

- 메소드 체이닝을 이용

| 메소드 | 설명 |
|-|-|
| `sort({ 필드명 : 조건 })` | 정렬 수행<br>1은 오름차순, -1은 내림차순 |
| `limit(개수)` | 조회할 다큐먼트 수 제한 |
| `skip(개수)` | 시작점으로부터 해당 개수를 제외하고 리턴 |
| `pretty()` | JSON 데이터를 보기 좋게 출력 |

```js
db.articles.find({
  $and : [{ writer : "Velopert"}, { likes : { $lt : 10 } }]
}).pretty();

// WHERE 조건 연속 나열. 위 조회 구문과 동일함
db.articles.find({ writer : "Velopert", likes : { $lt : 10 } }).pretty();

db.users.find({}, { _id: 0, name: 1, married: 1});

db.users.find({}, { _id: 0, name: 1, married: 1}).sort({ age: -1 });

db.users.find({}, { _id: 0, name: 1, age: 1}).sort( { age: -1 } ).limit(1).skip(1);
```

### 다. UPDATE

- `update()` 혹은 `save()` 메소드 사용
  - `save()` INSERT에서 설명한 내용과 동일(UPSERT)
- `db.컬렉션명.update({param1}, {param2})` 구조
  - 첫번째 파라미터: 수정할 다큐먼트 지정
  - 두번째 파라미터: 수정할 내용을 입력하는 객체. `$set` 미지정시 다큐먼트의 객체가 해당 객체로 수정되므로 주의


```js
db.users.update(
  { name: 'nero' },
  { $set: { comment: '수정할 내용' }}
);
```

### 라. DELETE

- `remove()` 메소드 사용
- `db.컬렉션명.remove( {param} )` 구조
  - 파라미터: 삭제할 다큐먼트에 대한 정보가 담긴 객체

```js
db.users.remove({ name: 'nero' });
```


## ※ 자바스크립트 코드 실행

```js
var showpage = function(page) {
	return db.orders.find().sort({"_id" : 1}).skip((page-1)*2).limit(2);
}

// 1,2번 출력
showpage(1) 

// 3,4번 출력
showpage(2)
```

- mongodb 명령어 뿐만 아니라 자바스크립트 코드도 실행이 가능하다
