Git 기본
========

## 1. 초기 설정

```bash
git config --global user.name "유저명"
git config --global user.email 유저 이메일 주소
```


## 2. 기본 명령어

### 가. 생성 및 초기화

```bash
git init
```
- 실행한 위치에 Git 저장소 생성 및 초기화


### 나. 파일 추적

```bash
git add [파일 혹은 디렉토리 경로] 
```
- 해당 파일을 Git이 추적할 수 있게 저장소에 추가
- 디렉토리 경로 지정 시 해당 디렉토리 내의 모든 파일을 저장소에 추가


### 다. 변경사항 제출

```bash
git commit
```
- 변경된 파일을 저장소에 제출
- `git commit -a` 명령어로 변경된 저장소 파일을 모두 커밋
- `git commit -m "커밋 메시지"` 명령어로 에디터를 사용하지 않고 인라인 방식으로 커밋 메시지를 작성


### 라. 상태 확인

```bash
git status
```
- 현재 저장소의 상태 출력
- 현재 작업 중인 브랜치와 파일 추적 정보를 알려줌


## 3. branch 명령어
 
| 명령어 및 옵션 | 설명 |
|-|-|-|
| git branch 이름 | 저장소에 해당 이름의 브랜치 생성 |
| git checkout 브랜치명 | 현재 작업 중인 브랜치를 변경 |
| git checkout -b 브랜치명 | 브랜치 생성 후 바로 체크아웃 |
| git merge 브랜치명 | 현재 작업 중인 브랜치에 해당 브랜치를 끌어와 병합 |


## 4. git log

| 옵션 | 설명 |
|-|-|
| git log -p | 각 커밋에 적용된 실제 변경 내용 출력 |
| git log --word-diff | diff 명령의 실행 결과를 단어 단위로 출력 |
| git log --stat | 각 커밋에서 수정된 파일의 통계 정보 출력 |
| git log --name-only | 커밋 정보 중에서 수정된 파일의 목록만 출력 |
| git log --relative-date | 정확한 시간이 아닌, 1일전, 1주일 전 처럼 상대적인 시간을 비교하는 형식으로 출력 |
| git log --graph | 브랜치 분기와 병합 내역을 아스키 그래프로 출력 |
