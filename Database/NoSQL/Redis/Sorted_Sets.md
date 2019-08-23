Sorted Sets 자료형
========

- Key 하나에 여러 개의 Score와 Value로 구성된 자료형
- Score는 반드시 숫자여야 함
- Value는 Score를 기준으로 정렬되며, 중복을 허용하지 않는 자료형
- Sorted Sets에서는 집합이라는 의미에서 VALUE를 MEMBER라 부름
- Sorted Sets는 주로 정렬이 필요한 곳에서 사용됨

## 주요 명령어

### SET

| 명령어 | 문법 | 설명 |
|-|-|-|
| ZADD | KEY SCORE MEMBER [SCORE MEMBER ...] | 집합에 데이터(MEMBER)를 SCORE와 함께 추가.<br/>SCORE가 같으면 MEMBER를 기준으로 정렬됨<br/>이미 MEMBER가 존재하는 경우 SCORE를 업데이트 |


### GET

| 명령어 | 문법 | 설명 |
|-|-|-|
| ZRANGE | KEY START STOP [WITHSCORES] | START~END 인덱스로 범위를 지정해서 조회. SCORE가 같으면 MEMBER로 비교<br/>WITHSCORE 옵션 사용 시 SCORE가 같이 표시됨 |
| ZRANGEBYSCORE | KEY MIN MAX [WITHSCORES] [LIMIT OFFSET COUNT] | MIN~MAX로 SCORE 범위를 지정해서 조회.<br/>LIMIT 옵션 사용 시 OFFSET과 COUNT가 모두 있어야함<br/>OFFSET: 시작점<br/>COUNT: 조회할 MEMBER 개수 |
| ZRANGEBYLEX | KEY MIN MAX [LIMIT OFFSET COUNT] | MIN~MAX로 MEMBER 범위를 지정해서 조회<br/>모두 조회 시 `-`(MIN) `+`(MAX)를 사용<br/>MIN, MIX에 값을 주는 경우 반드시 앞에 `[`(값 포함) 또는 `(`(값 제외)를 사용<br/>**SCORE가 모두 같아야 원하는 결과를 얻을 수 있음** |
| ZREVRANGE | KEY START STOP [WITHSCORES] | START~STOP으로 범위를 지정해서 조회. ZRANGE와 반대로 큰 값부터 인덱스가 매겨진다.<br/>SCORE가 큰 값부터 조회되며, SCORE가 같으면 MEMBER로 비교 |
| ZREVRANGEBYSCORE | KEY MAX MIN [WITHSCORES] [LIMIT OFFSET COUNT] | MAX~MIN으로 SCORE 범위를 지정해서 큰 값부터 조회. MAX, MIN을 포함.<br/>모두 조회 시 `+inf`, `-inf`를 사용 |
| ZREVRANGEBYLEX | KEY MAX MIN [LIMIT OFFSET COUNT] | MAX~MIN으로 MEMBER 범위를 지정해서 큰 값부터 조회 |
| ZRANK | KEY MEMBER | MEMBER의 RANK(INDEX)를 조회<br/>SCORE 순으로 INDEX가 매겨진다 |
| ZREVRANK | KEY MEMBER | MEMBER를 역순으로 INDEX(RANK)를 조회<br/>SCORE(MEMBER)가 큰 순으로 0부터 INDEX가 매겨진다 |
| ZSCORE | KEY MEMBER | MEMBER의 SCORE를 조회 |
| ZCARD | KEY | 집합에 속한 MEMBER의 갯수를 조회 |
| ZCOUNT | KEY MIN MAX | MIN~MAX로 SCORE 범위를 지정해서 갯수 조회 |
| ZLEXCOUNT | KEY MIN MAX | MIN~MAX로 MEMBER 범위를 지정해서 갯수 조회 |
| ZSCAN | KEY CURSOR [MATCH PATTERN] [COUNT COUNT]| SCORE, MEMBER를 일정 단위 갯수만큼씩 조회 |



### POP

| 명령어 | 문법 | 설명 |
|-|-|-|
| ZPOPMIN | KEY [COUNT] | 작은 값부터 COUNT만큼 값을 꺼내옴 |
| ZPOPMAX | KEY [COUNT] | 큰 값부터 COUNT만큼 값을 꺼내옴 |


### REM

| 명령어 | 문법 | 설명 |
|-|-|-|
| ZREM | KEY MEMBER [MEMBER...] | 집합에서 MEMBER를 삭제 |
| ZREMRANGEBYRANK | KEY START STOP | START~STOP 인덱스로 범위를 지정해서 MEMBER를 삭제 |
| ZREMRANGEBYSCORE | KEY MIN MAX | MIN~MAX로 SCORE 범위를 지정해서 MEMBER를 삭제 |
| ZREMRANGEBYLEX | KEY MIN MAX | MIN~MAX로 MEMBER 범위를 지정해서 MEMBER를 삭제 |


### INCR

| 명령어 | 문법 | 설명 |
|-|-|-|
| ZINCRBY | KEY INCR MEMBER | INCR 만큼 MEMBER의 SCORE를 증감<br/>정수, 실수, 음수 사용 가능 |


### 집합연산

| 명령어 | 문법 | 설명 |
|-|-|-|
| ZUNIONSTORE | DEST_KEY NUMKEYSS SRC_KEY [SRC_KEY ...] [WEIGHTS WEIGHT [WEIGHT...]] [AGGREGATE SUM\|MIN\|MAX] | SRC_KEY 간의 합집합을 구해서 새로운 집합(DEST_KEY)에 저장 |
| ZINTERSTORE | DEST_KEY NUMKEYSS SRC_KEY [SRC_KEY ...] [WEIGHTS WEIGHT [WEIGHT...]] [AGGREGATE SUM\|MIN\|MAX] | SRC_KEY 간의 교집합을 구해서 새로운 집합(DEST_KEY)에 저장 |
