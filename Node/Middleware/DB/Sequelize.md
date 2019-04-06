Sequelize
========

- Node.js 진영의 ORM
- PostgreSQL, MySQL, MariaDB, SQLite, MSSQL을 지원.
- Promise 문법 지원


## 1. 설치

```bash
npm i sequelize mysql2
npm i -g sequelize-cli
sequelize init
```

- 시퀄라이즈는 DB 드라이버 패키지를 포함하고 있지 않기에 별도로 설치(`mysql2`)
- `sequelize-cli` 패키지를 설치하면 `init` 명령어로 기본적인 설정 템플릿을 사용할 수 있다
  - config, models, migrations, seeders 폴더 및 기본 설정 파일이 생성됨


## 2. 기본 설정


### models/index.js

```js
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

// db 커넥션 설정
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// model 정보 설정
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comments')(sequelize, Sequelize);

// db 객체 export
module.exports = db;
```

- 기본 설정의 경우 불필요한 코드, 설정이 있으므로 간소화

### config/config.js

```js
{
  "development": {
    "username": "nodejs",
    "password": "nodejs",
    "database": "nodejs",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  ...
}
```

- 환경별로 사용할 DB config 정보
- operatorsAliases: 보안에 취약한 연산자를 사용할지 여부

## 3. 모델 정의

- 자바스크립트 객체와 DB 테이블 간의 매핑을 위해 모델을 정의
- 시퀄라이즈는 기본적으로 모델 이름은 단수형, 테이블 이름은 복수형으로 사용함
- sequelize.define() 메소드를 이용

### models/user.js
```js
module.exports = (sequelize, DataTypes) => (
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    married: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
  }, {
    timestamps: false,
  });
);
```

- 첫번째 파라미터: 모델의 이름
- 두번째 파라미터: 테이블과 매핑되는 정보
  - type: 데이터 타입
  - primaryKey: 기본키 여부 설정. 기본값 false
  - autoIncrement: SERIAL(auto increment) 여부. 기본값 false
  - allowNull: NOT NULL 조건 여부. 기본값 true
  - unique: Unique 조건 여부
  - comment: 컬럼의 comment 설정
  - validate: 각 컬럼에 대한 validation check 옵션
- 세번째 파라미터: config 옵션
  - timestamps: true인 경우 createdAt, updatedAt 컬럼을 추가
  - paranoid: true인 경우 deletedAt 컬럼 추가. row 삭제 시 실제 데이터가 삭제되지 않고 deletedAt에 삭제된 날짜를 입력. find시 제외됨. timestamps가 true인 경우에만 사용 가능
  - underscored: true인 경우 column 이름을 카멜 케이스가 아닌 언더스코어 방식을 사용
  - freezeTableName: define method의 첫번째 파라미터 값으로 테이블 이름을 자동 변환 하는데(복수형), true인 경우 이 작업을 하지 않음
  - tableName: 시퀄라이즈가 자동으로 생성하는 테이블 명을 사용하지 않을 경우 사용.
  - comment: 테이블에 대한 comment 설정
- sequelize.literal(): 메소드 인자로 넣은 문자를 그대로 사용


>  시퀄라이즈는 자동으로 id 컬럼을 생성하고 기본 키로 연결하므로 별도로 적을 필요는 없음

### models/comment.js

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('comment', {
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('now()'),
    },
  }, {
    timestamps: false,
  });
};
```

## 4. 관계 정의

1. HasOne: 1:1관계 설정 시 사용. 1에 해당되는 모델
2. HasMany: 1:N 관계 설정 시 사용. 1에 해당되는 모델
3. BelongsTo: 1:1관계 혹은 1:N 관계 설정 시 사용. 1 또는 N에 해당되는 모델
4. BelongsToMany: N:M 관계 설정 시 사용

시퀄라이즈에서 테이블 간 관계를 정의하는 메소드

### models/index.js

```js
// 모델간 관계 설정
db.User.hasMany(db.Comment, {foreignKey:'commenter', sourceKey:'id'});
db.Comment.belongsTo(db.User, {foreignKey:'commenter', targetKey:'id'});
```

- hasMany, belongsTo 메소드를 이용해서 1:N 관계 설정
  - foreignKey: 외래키 컬럼 설정. 외래키를 사용하는 모델에 속성값을 이름으로 가지는 컬럼을 생성함
  - sourceKey: 참조될 컬럼을 설정
  - targetKey: 참조할 컬럼을 설정
- User 모델의 id가 Comment 모델의 commenter 컬럼에 들어가게 됨


## 4. Sequelize Sync

### models/index.js

```js
// models/index.js에서 정의한 sequelize 속성
var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();
```

- sequelize.sync() 메소드를 이용하면 서버 실행 시 MySQL과 자동으로 연동
- IF NOT EXIST 조건으로 모델과 대응되는 테이블들을 생성하게 된다


## 5. CRUD 작업

```js
const { User } = require('../models');
```

- CRUD 작업을 할 모델을 불러와서 사용

### 가. CREATE

#### sql
```sql
INSERT INTO nodejs.users(name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');
```

#### sequelize
```js
User.create({
  name: 'zero',
  age: 24,
  married: false,
  comment: '자기소개1',
})
```

### 나. READ

- find, findAll 메소드를 이용


### 기본 사용법

#### sql
```sql
SELECT * FROM nodejs.users;
SELECT * FROM nodejs.users LIMIT 1;
SELECT name, married FROM nodejs.users;
```

#### sequelize
```js
User.findAll({});
User.find({});
User.findAll({ attributes: ['name', 'married'] });
```

### WHERE 절

```js
const { Sequelize: { Op } } = require('../models');
```

- 시퀄라이즈는 자바스크립트 객체를 사용해서 쿼리를 생성해야 하므로 Op.gt 같은 특수한 연산자들이 사용됨
- Sequelize 객체 내부의 Op 객체를 불러와서 사용
  - Op.gt: 초과
  - Op.gte: 이상
  - Op.lt: 미만
  - Op.lte: 이하
  - Op.ne: 같지 않음
  - Op.or: OR 조건
  - Op.in: IN 조건. 배열 요소 중 하나
  - Op.notIn: 배열 요소와 모두 다름

```sql
SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
SELECT id, name FROM nodejs.users ORDER BY age DESC;
SELECT in, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;
```

```js
User.findAll({
  attributes: ['name', 'age'],
  where: {
    married: 1,
    age: { [Op.gt]: 30 },
  },
});

User.findAll({
  attributes: [id, name],
  order: [['age', 'DESC']],
});

User.findAll({
  attributes: [id, name],
  order: ['age', 'DESC'],
  limit: 1,
  offset: 1,
});
```

> order의 경우 여러 컬럼을 기준으로 정렬 할 수 있으므로 배열 내에 배열로 선언하여 사용할 수도 있음


### 다. UPDATE

```sql
UPDATE nodejs.users SET comment='바꿀 내용' WHERE id=2;
```

```js
User.update(
  { comment: '바꿀 내용' },
  { where: { id: 2 } }
);
```

### 라. DELETE

```sql
DELETE FROM nodejs.users WHERE id=2;
```

```js
User.destroy(
  { where: { id: 2 } }
);
```

--------

- [시퀄라이즈 문서](http://docs.sequelizejs.com/)
