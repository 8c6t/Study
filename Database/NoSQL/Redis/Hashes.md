Hashes 자료형
========

- Key 하나에 여러 개의 Field와 Value로 구성된 자료형
- Key 하나에 Field와 Value 쌍을 40억개까지 저장 가능
- RDB의 Table과 유사한 자료형
  - Key = PK
  - Field = Column
  - Value = Value
  - Key가 PK와 같은 역할을 하기 때문에 Key 하나는 Row와 같음

## 주요 명령어

### SET

| 명령어 | 문법 | 설명 |
|-|-|-|
| HSET | KEY FIELD VALUE | FIELD와 VALUE를 저장. 기존에 같은 FIELD가 있으면 덮어씀. |
| HMSET | KEY FIELD VALUE [FIELD VALUE ...] | 여러 개의 FIELD와 VALUE를 저장 |
| HSETNX | KEY FIELD VALUE | KEY에 FIELD가 존재하지 않으면 저장. 존재할 경우 저장하지 않음 |


### GET

| 명령어 | 문법 | 설명 |
|-|-|-|
| HGET | KEY FIELD | 해당 KEY의 FIELD의 VALUE을 조회 |
| HMGET | KEY FIELD [FIELD ...] | 해당 KEY의 여러 FIELD의 VALUE을 조회 |
| HLEN | KEY | 해당 KEY의 FIELD 개수를 조회 |
| HKEYS | KEY | 해당 KEY의 모든 FIELD 이름을 조회 |
| HVALS | KEY | 해당 KEY의 모든 VALUE를 조회 |
| HGETALL | KEY | 해당 KEY의 모든 FIELD와 VALUE를 조회 |
| HSTRLEN | KEY FIELD | 해당 KEY의 FIELD VALUE의 길이(byte)를 조회 |
| HSCAN | KEY CURSOR [MATCH PATTERN] [COUNT COUNT] | FIELD, VALUE를 일정 단위 갯수만큼씩 조회 |
| HEXISTS | KEY FIELD | 해당 KEY에 FIELD가 존재하는지 조회. 있으면 1, 없으면 0을 반환 |


### REM

| 명령어 | 문법 | 설명 |
|-|-|-|
| HDEL | KEY FIELD [FIELD ...] | 해당 KEY에서 지정된 FIELD와 그 VALUE를 삭제 |


### INCR

| 명령어 | 문법 | 설명 |
|-|-|-|
| HINCRBY | KEY FIELD INCR | 해당 KEY의 FIELD의 VALUE를 INCR 만큼 증감 |
| HINCRBYFLOAT | KEY FIELD INCR_FLOAT | 해당 KEY의 FIELD의 VALUE를 INCR_FLOAT 만큼 증감 |
