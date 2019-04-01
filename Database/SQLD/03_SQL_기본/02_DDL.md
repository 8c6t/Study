DDL
========

- 데이터 정의어(Data Definition Language)
- CREATE, ALTER, DROP, RENAME

## 1. 데이터 유형

### 가. CHARACTER(s)

- 고정 길이 문자열 정보
- Oracle, SQL Server 모두 CHAR로 표현
- s는 기본 길이 1바이트, 최대 길이는 Oracle 2000바이트, SQL Server 8000바이트
- 고정 길이를 가지고 있으므로 할당된 변수 값의 길이가 s보다 작을 경우에는 그 차이 길이만큼 **빈 공간으로 채워진다**

### 나. VARCHAR(s)

- CHARACTER VARYING의 약자로 가변 길이 문자열 정보
- Oracle은 VARCHAR2로 표현. SQL Server는 VARCHAR로 표현
- s는 최소 길이 1바이트, 최대 길이는 Oracle 4000바이트, SQL Server 8000바이트
- s만큼 최대 길이를 가지지만, 가변 길이로 조정이 되기 때문에 **할당된 변수값의 바이트만 적용**된다(Limit 개념)

### 다. NUMERIC
- 정수, 실수 등 숫자 정보
- Oracle은 NUMBER로 표현. SQL Server는 10가지 이상의 숫자 타입을 가지고 있음
- Oracle은 처음에 전체 자리 수를 지정하고, 그 다음 소수 부분의 자리 수를 지정

### 라. DATETIME
- 날짜와 시각 정보
- Oracle은 DATE로 표현. SQL Server는 DATETIME으로 표현
- Oracle은 1초 단위. SQL Server는 3.33ms 단위 관리

## 2. CREATE TABLE

### 가. 구문 형식

`CREATE TABLE 테이블명(칼럼명1 DATATYPE [DEFAULT 형식], 칼럼명2 DATATYPE [DEFAULT 형식], ...);`

### 나. 테이블 생성 시 규칙

1. 테이블명은 객체를 의미할 수 있는 적절한 이름을 사용
2. 가능한 단수형을 권고
3. 테이블 명은 다른 테이블 이름과 중복되지 않아야 함
4. 한 테이블 내에서는 칼럼명이 중복되게 지정될 수 없음
5. 테이블 이름을 지정하고 각 칼럼들은 괄호`()`로 묶어 지정
6. 각 칼럼들은 콤마`,`로 구분
7. 테이블 생성문의 끝은 항상 세미콜론`;`으로 끝남
8. 칼럼에 대해서는 다른 테이블까지 고려하여 DB 내에서는 일관성 있게 사용하는 것이 좋음
9. 칼럼 뒤에 데이터 유형은 꼭 지정되어야 함
10. 테이블명과 칼럼명은 반드시 문자로 시작. 벤더별로 길이 한계 있음
11. 벤더에서 사전에 정의한 예약어는 사용 불가
12. 테이블 생성시 대/소문자 구분은 하지 않음. 기본적으로 테이블이나 칼럼명은 대문자로 만들어짐
13. DATETIME 데이터 유형에 대해서는 별도로 크기를 지정하지 않음
14. 문자 데이터 유형은 반드시 가질 수 있는 최대 길이를 표시해야 함
15. 칼럼과 칼럼의 구분은 콤마로 하되, 마지막 칼럼은 콤마를 찍지 않음
16. 칼럼에 대한 제약조건이 있으면 **CONSTRAINT**를 이용하여 추가


### 다. 제약 조건(CONSTRAINT)

- 데이터의 무결성을 유지하기 위해 테이블의 특정 컬럼에 설정하는 제약
- 제약 조건은 CREATE 혹은 ALTER 작업 때 설정 가능

#### 1) PRIMARY KEY(기본키)

- UNIQUE + NOT NULL
- 테이블에 저장된 행 데이터를 고유하게 식별하기 위한 제약 조건
- 하나의 테이블에 하나의 기본키 제약만 정의 가능
- 기본키 제약을 정의하면 DBMS는 자동으로 **UNIQUE 인덱스를 생성**하며, 기본키를 구성하는 컬럼에는 NULL을 입력할 수 없다

#### 2) UNIQUE KEY(고유키)

- 테이블에 저장된 행 데이터를 고유하기 식별하기 위한 제약 조건
- **NULL은 고유키 제약의 대상이 아니므로**, NULL 값을 가진 행이 여러 개 있더라도 고유키 제약 위반이 되지 않음 = NULL 삽입 가능

#### 3) NOT NULL
- NULL 값의 입력을 금지
- NOT NULL 제약 조건을 설정하지 않은 경우(기본값) 모든 칼럼에서 NULL을 허가

#### 4) CHECK
- 입력할 수 있는 값의 범위 등을 제한. 조건에 부합하는 데이터만 입력이 가능
- CHECK 제약으로는 boolean 값으로 평가할 수 있는 논리식(기본연산자, 비교연산자, IN, NOT IN 등)을 지정

#### 5) FOREIGN KEY(외래키)
- 관계형 DB에서 테이블 간의 관계를 정의하기 위해 기본키를 다른 테이블의 외래키로 복사하는 경우
- 외래키 지정 시 참조 무결성 제약 옵션 설정 가능


### ※ FK 참조 무결성 옵션

```
[CONSTRAINT [별칭]] FOREIGN KEY (컬럼명, ...)
    REFERENCES 테이블명 (컬럼명, ...)
    [ON DELETE 옵션]
    [ON UPDATE 옵션]
```

#### 1) DELETE(/MODIFY) ACTION

| 옵션 | 설명 |
|-|-|
| CASCADE | Master 삭제 시 Child 같이 삭제 |
| SET NULL | Master 삭제 시 Child 해당 필드 Null |
| SET DEFAULT | Master 삭제 시 Child 해당 필드 Default 값으로 설정 |
| RESTRICT | Child 테이블에 PK 값이 없는 경우에만 Master 삭제 허용 |
| NO ACTION | 참조무결성을 위반하는 삭제/수정 액션을 취하지 않음 |

#### 2) INSERT ACTION

| 옵션 | 설명 |
|-|-|
| AUTOMATIC | Master 테이블에 PK가 없는 경우, Master PK를 생성 후 Child 입력
| SET NULL | Master 테이블에 PK가 없는 경우, Child 외래키를 Null 값으로 처리 |
| SET DEFAULT | Master 테이블에 PK가 없는 경우, Child 외래키를 지정된 기본값으로 입력 |
| DEPENDENT | Master 테이블에 PK가 존재할 때만 Child 입력 허용 |
| NO ACTION | 참조무결성을 위반하는 입력 액션을 취하지 않음 |


### 라. 생성된 테이블 구조 확인

- Oracle : `DESCRIBE 테이블명;` 혹은 `DESC 테이블명;`
- SQL Server : `sp_help 'dbo.테이블명'`

### 마. SELECT 문장을 통한 테이블 생성(CTAS)

`CREATE TABLE 테이블명 AS SELECT * FROM 복사할_테이블명`

- 기존 테이블 제약 조건 중 NOT NULL만 적용된다


## 3. ALTER TABLE

- 테이블의 구조를 바꿀 때 사용
- ADD/DROP/MODIFY/RENAME COLUMN
- ADD/DROP CONSTRAINT

### 가. ADD COLUMN

`ALTER TABLE 테이블명 ADD 추가할_칼럼명 데이터_유형`

### 나. DROP COLUMN

`ALTER TABLE 테이블명 DROP COLUMN 삭제할_칼럼명`

### 다. MODIFY COLUMN

`ALTER TABLE 테이블명 MODIFY (칼럼명1 데이터_유형 [DEFAULT식] [NOT NULL], 칼럼명2 데이터_유형 ...)`

- 해당 칼럼의 크기를 늘릴 수는 있지만 줄이지는 못 함
- 해당 칼럼이 NULL 값만 가지고 있거나 테이블에 아무 행도 없으면 칼럼의 폭을 줄일 수 있음
- 해당 칼럼이 NULL 값만을 가지고 있으면 데이터 유형 변경 가능
- 해당 칼럼의 DEFAULT 값을 바꾸면 변경 작업 이후 발생하는 행 삽입에만 영향을 미침
- 해당 칼럼에 NULL값이 없을 경우에만 NOT NULL 제약조건 추가 가능

#### ※ RENAME COLUMN

`ALTER TABLE 테이블명 RENAME COLUMN 변경할_칼럼명 TO 새로운_칼럼명`
- 칼럼명을 불가피하게 변경해야 하는 경우 사용

### 라. DROP CONSTRAINT

`ALTER TABLE 테이블명 DROP CONSTRAINT 제약조건명`

### 마. ADD CONSTRAINT

`ALTER TABLE 테이블명 ADD CONSTRAINT 제약조건명 제약조건 (대상칼럼)`


## 4. RENAME TABLE

`RENAME TABLE 변경할_테이블명 TO 새로운_테이블명`


## 5. DROP TABLE

`DROP TABLE 테이블명 [CASCADE CONSTRAINT]`
- CASCADE CONSTRAINT 옵션은 해당 테이블과 관계가 있었던 참조되는 제약조건에 대해서도 삭제한다는 것을 의미

## 6. TRUNCATE TABLE

`TRUNCATE TABLE 테이블명`

- 테이블의 구조는 둔 채 데이터만 삭제하는 것
- TRUNCATE는 데이터 구조의 변경 없이 테이블의 데이터를 일괄 삭제하는 명령어로 DML로 분류할 수도 있지만, 내부 처리 방식이나 **Auto Commit** 특성 등으로 인해 DDL로 분류
- DELETE TABLE 보다 부하가 적으나, 실행 후 정상적인 **복구가 불가능**

