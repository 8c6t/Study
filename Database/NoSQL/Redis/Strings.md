Strings 자료형
========

- Key-Value가 1:1 관계인 자료형
- 바이너리 세이프한 자료형이므로 Key, Value에 알파벳, 숫자, 한글, 이미지 등을 사용할 수 있음
- Key와 Value의 최대 길이는 512MB


## 주요 명령어

### SET

| 명령어 | 문법 | 설명 |
|-|-|-|
| SET | KEY VALUE | 데이터 저장. KEY 존재시 덮어씀 |
| SETNX | KEY VALUE | 해당 KEY가 존재하지 않는 경우에만 저장 |
| SETEX | KEY SEC VALUE | 지정된 시간(초) 이후 데이터 자동 삭제 |
| PSETEX | KEY MSEC VALUE | 지정된 시간(밀리초) 이후 데이터 자동 삭제 |
| MSET | KEY VALUE [KEY VALUE ...] | 여러 데이터를 동시에 저장 |
| MSETNX | KEY VALUE [KEY VALUE ...] | 해당 KEY가 없을 경우에만 여러 데이터를 동시에 저장 |
| APPEND | KEY VALUE  | 키가 존재하는 경우 해당 키 값의 제일 뒤에 입력된 값을 추가. 없으면 set과 동일 |
| SETRANGE | KEY OFFSET VALUE | 해당 위치(OFFSET)부터 데이터를 겹쳐씀 |


### GET

| 명령어 | 문법 | 설명 |
|-|-|-|
| GET | KEY | 데이터 조회 |
| MGET | KEY [KEY ...] | 여러 데이터 동시 조회 |
| GETRANGE | KEY START END | 해당 KEY의 START부터 END 인덱스까지의 문자열을 조회 |
| STRLEN | KEY | 해당 KEY의 바이트 수 반환 |
| GETSET | KEY VALUE | 기존 데이터를 조회하고 새 데이터를 저장 |

### INCR

| 명령어 | 문법 | 설명 |
|-|-|-|
| INCR | KEY | 해당 KEY의 값을 1씩 증가. 기존 값이 없는 경우 1로 설정 |
| DECR | KEY | 해당 KEY의 값을 1씩 감소. 기존 값이 없는 경우 -1로 설정 |
| INCRBY | KEY INCR | INCR만큼 해당 KEY 증가. 기존 값이 없는 경우 INCR로 설정 |
| DECRBY | KEY DECR | DECR만큼 해당 KEY 감소. 기존 값이 없는 경우 -DECR로 설정 |
| INCRBYFLOAT | KEY INCR | 실수연산. INCR만큼 증가. 기존 값이 없는 경우 INCR로 설정 |