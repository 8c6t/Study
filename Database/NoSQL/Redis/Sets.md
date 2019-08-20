Sets 자료형
========

- Key-Value가 1:N 관계인 자료형
- Value간 순서가 존재하지 않고, 중복을 허용하지 않는 자료형
- Sets에서는 집합이라는 의미에서 VALUE를 MEMBER라 부름
- Sets는 주로 집합연산이 필요한 경우 사용됨

## 주요 명령어

### SET

| 명령어 | 문법 | 설명 |
|-|-|-|
| SADD | KEY MEMBER [MEMBER ...] | 지정된 집합에 MEMBER를 추가.<br/>이미 MEMBER가 존재하는 경우 추가되지 않음 |
| SMOVE | SRC_KEY DEST_KEY MEMBER | SRC_KEY 집합의 MEMBER를 DEST_KEY 집합으로 이동 |

### GET

| 명령어 | 문법 | 설명 |
|-|-|-|
| SMEMBERS | KEY | 집합의 모든 MEMBER를 조회 |
| SCARD | KEY | 집합에 속한 모든 MEMBER의 개수를 조회 |
| SRANDMEMBER | KEY [COUNT] | 집합에서 무작위로 MEMBER를 조회<br/>COUNT 옵션은 2.6버전부터 사용 가능하며, 해당 개수만큼 조회.<br/>COUNT가 양수이면 MEMBER를 중복하지 않고 조회.<br/>COUNT가 음수이면 MEMBER를 중복해서 조회할 수 있음 |
| SISMEMBER | KEY MEMBER | 집합에 MEMBER가 존재하는지 확인 |


### POP

| 명령어 | 문법 | 설명 |
|-|-|-|
| SPOP | KEY [COUNT] | 집합에서 무작위로 MEMBER를 가져오며, 해당 MEMBER는 집합에서 삭제됨.<br/>COUNT 옵션은 3.2버전부터 사용 가능하며, 해당 개수만큼 가져온다 |

### REM

| 명령어 | 문법 | 설명 |
|-|-|-|
| SREM | KEY MEMBER [MEMBER ...] | 집합에서 MEMBER를 삭제 |

### 집합연산

| 명령어 | 문법 | 설명 |
|-|-|-|
| SUNION | KEY [KEY ...] | 집합 간의 합집합을 반환 |
| SINTER | KEY [KEY ...] | 집합 간의 교집합을 반환 |
| SDIFF | KEY [KEY ...] | 집합 간의 차집합을 반환 |
| SUNIONSTORE | DEST_KEY SRC_KEY [SRC_KEY ...] | SRC_KEY 간의 합집합을 구해서 새로운 집합(DEST_KEY)에 저장 |
| SINTERSTORE | DEST_KEY SRC_KEY [SRC_KEY ...] | SRC_KEY 간의 교집합을 구해서 새로운 집합(DEST_KEY)에 저장 |
| SDIFFSTORE | DEST_KEY SRC_KEY [SRC_KEY ...] | SRC_KEY 간의 차집합을 구해서 새로운 집합(DEST_KEY)에 저장 |
