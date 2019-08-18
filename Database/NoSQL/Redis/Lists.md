Lists 자료형
========

- Key-Value가 1:N 관계인 자료형
- Value는 입력된 순서대로 저장됨
- Lists는 주로 Queue와 Stack을 구현하는데 사용됨
- Value가 저장되면 Key(List)가 생성되고, Key에 Value가 하나도 없으면 Key가 삭제됨
- 3.2 버전 이후로는 List의 내부 데이터 타입이 퀵 리스트 하나로 확정됨

## 주요 명령어

### SET

| 명령어 | 문법 | 설명 |
|-|-|-|
| LPUSH | KEY VALUE [VALUE ...] | 지정된 리스트의 가장 앞에 데이터를 저장 |
| RPUSH | KEY VALUE [VALUE ...] | 지정된 리스트의 가장 뒤에 데이터를 저장 |
| LPUSHX | KEY VALUE | 기존에 리스트가 있을 경우에만 LPUSH 실행 |
| RPUSHX | KEY VALUE | 기존에 리스트가 있을 경우에만 RPUSH 실행 |
| LSET | KEY INDEX VALUE | 해당 인덱스의 값을 변경 |
| LINSERT | KEY BEFORE\|AFTER PIVOT VALUE | 지정한 값(PIVOT)의 앞(BEFORE)/뒤(AFTER)에 새 값 저장 |
| RPOPLPUSH | KEY SRC_KEY DEST_KEY | SRC_KEY 리스트의 오른쪽에서 데이터를 꺼내서(RPOP) DEST_KEY 리스트의 왼쪽에 넣음(LPUSH) |


### GET

| 명령어 | 문법 | 설명 |
|-|-|-|
| LRANGE | KEY START STOP | START부터 STOP 인덱스까지 범위를 지정해서 리스트 조회 |
| LINDEX | KEY INDEX | 해당 인덱스의 값을 조회 |
| LLEN | KEY | 해당 리스트의 데이터 총 갯수 조회 |

### POP

| 명령어 | 문법 | 설명 |
|-|-|-|
| LPOP | KEY | 리스트 왼쪽에서 데이터를 꺼내서 반환하고, 리스트에서 제거 |
| RPOP | KEY | 리스트 오른쪽에서 데이터를 꺼내서 반환하고, 리스트에서 제거 |
| BLPOP | KEY [KEY ...] TIMEOUT | 리스트에 값이 없을 경우, 지정한 시간만큼 기다려서 값이 들어오면 LPOP 실행. 값이 있는 경우 LPOP과 동일 |
| BRPOP | KEY DECR | 리스트에 값이 없을 경우, 지정한 시간만큼 기다려서 값이 들어오면 RPOP 실행. 값이 있는 경우 RPOP과 동일 |

### REM

| 명령어 | 문법 | 설명 |
|-|-|-|
| LREM | KEY COUNT VALUE | 지정한 수(COUNT)만큼 리스트의 왼쪽에서 VALUE를 삭제. 0이면 모두 삭제 |
| LTRIM | KEY START STOP | START부터 STOP 인덱스 범위 외의 값들을 삭제 |
