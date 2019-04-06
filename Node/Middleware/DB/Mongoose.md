Mongoose
========

- MongoDB의 ODM(Object Document Mapping)
- schema, populate, Promise, 쿼리 빌더 지원
  - schema: 데이터 타입 정의 및 검증
  - populate: JOIN과 유사한 기능. 관련된 컬렉션의 다큐먼트를 불러옴

## 1. 설치

```bash
npm i mongoose
```

## 2. 기본 설정

### schemas/index.js
```js
const mongoose = require('mongoose');

// 커넥션 설정
module.exports = () => {
  const connect = () => {
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://nodejs:nodejs@localhost:27017/admin', {
      /*
        deprecated 관련 추가 설정(useNewUrlParser, useCreateIndex)
        참고: https://mongoosejs.com/docs/deprecations.html
       */
      useNewUrlParser: true,
      useCreateIndex: true,
      dbName: 'nodejs',  // 실제 사용할 DB
    }, (err) => {
      if(err) {
        console.log('몽고DB 연결 에러', err);
      } else {
        console.log('몽고DB 연결 성공');
      }
    });
  };

  connect();

  // 커넥션 이벤트 리스너 설정
  mongoose.connection.on('error', (err) => {
    console.error('몽고DB 연결 에러', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('몽고DB 연결이 끊겼습니다 .연결을 재시도합니다');
    connect();
  });

  // 몽구스 스키마 설정
  require('./user');
  require('./comment');
}
```

### app.js

```js
var connect = require('./schemas');

var app = express();
connect();
```

## 3. 스키마 정의

- 몽구스 모듈에서 Schema 생성자를 이용해 스키마 생성
- String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array 등

### schemas/user.js

```js
const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
```

### schemas/comment.js

```js
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
```

- model() 메소드의 첫번째 파라미터로 컬렉션 이름을 생성(소문자 변환 -> 복수형 변환)
  - 별도의 컬렉션명을 사용하고자 할 경우 세번째 파라미터로 값을 전달
  - `mongoose.model('User', userSchema, 'user_table')`
- ref에 해당 ObjectId가 속해있는 모델을 추가하여 populate 기능 사용


## 4. CRUD 작업

- `Model.메소드()` 구조
  - 정의한 스키마 모델 정보를 불러와서 사용한다
  - `var User = require('../schemas/user')`;
- MongoDB의 메소드와 이름, 기능면에서 대부분 동일한 듯
  - deprecated 된 메소드, 몽구스에서 추가된 메소드들이 존재

### 가. CREATE

```js
router.post('/', async (req, res, next) => {
  try {
     const user = new User({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });
    // const user = new User(req.body);
    
    const result = await user.save();

    /*     
    const result = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    }); 
    // const result = await User.create(req.body);
    */

    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// save 뒤 populate 설정
router.post('/', async (req, res, next) => {
  try {
    const comment = new Comment({
      commenter: req.body.id,
      comment: req.body.comment,
    });
  
    let result = await comment.save();
    result = await Comment.populate(result, { path: 'commenter' });
    res.status(201).json(result);

  } catch (error) {
    console.error(error);
    next(error);
  }
});
```

- 주로 `save()` 혹은 `create()` 메소드 이용
  - 스키마 모델 객체 생성 후 `save()` 메소드를 이용
  - `create()` 메소드를 사용하면 객체 생성과 save를 한번에 할 수 있다
- populate(): save() 결과로 반환된 result 객체를 populate 메소드로 User 스키마와 합침
  - Comment 스키마 정의 때 ref 속성으로 참조할 컬렉션(User)을 지정하였음
  - path 옵션으로 어떤 필드를 합칠지 설정
  - **commenter 필드는 ObjectId가 아니라 그 ObjectId를 가진 User 다큐먼트로 치환됨**

### ※ populate() 결과

#### Before

```js
{ 
  _id: 5ca8b1bf43814626043b36d4,
  commenter: 5ca8a9f03698bc26d047dcd7,
  comment: '테스트 댓글',
  createdAt: 2019-04-06T14:03:43.241Z,
  __v: 0
}
```

#### After

```js
{ 
  _id: 5ca8b1bf43814626043b36d4,
  commenter: {
    _id: 5ca8a9f03698bc26d047dcd7,
    name: 'qazwsx',
    age: 55,
    married: false,
    createdAt: 2019-04-06T13:30:24.789Z,
    __v: 0 
  },
  comment: '테스트 댓글',
  createdAt: 2019-04-06T14:03:43.241Z,
  __v: 0
}
```


### 나. READ

```js
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
    console.log(comments);
    res.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```

- 주로 `find()` 메소드 이용
  - 파라미터로 WHERE 조건이 되는 객체가 들어간다
- populate() 메소드를 메소드 체이닝으로 이용


### 다. UPDATE

```js
router.patch('/:id', async (req, res, next) => {
  try {
    // deprecated 관련 메소드 변경. update -> updateOne
    const result = await Comment.updateOne(
      { _id: req.params.id }, 
      { comment: req.body.comment }
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```
- 주로 update() 메소드를 이용하였으나, deprecated 되었음. update 상황에 맞추어 적절한 메소드를 선택할 것
  - 첫번째 파라미터: WHERE 조건 객체
  - 두번째 파라미터: 수정할 필드와 값이 들어있는 객체
- `$set` 연산자를 사용하지 않아도 기입한 필드만 변경된다


### 라. DELETE

```js
router.delete('/:id', async (req, res, next) => {
  try {
    // deprecated 관련 메소드 변경. remove -> deleteOne
    const result = await Comment.deleteOne( { _id: req.params.id } );
    res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```
- 주로 delete() 메소드를 이용하였으나, deprecated 되었음. delete 상황에 맞추어 적절한 메소드를 선택할 것
  - 파라미터: WHERE 조건 객체


--------

> 1. [몽구스 공식 문서](https://mongoosejs.com/docs/guide.html) / [몽구스 공식 API문서](https://mongoosejs.com/docs/api.html)<br>
> 2. [몽구스 CRUD 메소드 정리 블로그](https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34)