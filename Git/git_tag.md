git tag
========

- 커밋을 참조하기 쉽도록 알기 쉬운 이름을 붙이는 명령어
- lightweight 태그와 annotated 태그로 나뉨

## 1. lightweight 태그

- 간단하게 이름만을 추가하는 태그

### 가. 태그 추가

```bash
git tag 태그명  # 가장 최근 커밋에 태그를 추가
git tag 태그명 SHA체크섬값  # 특정 커밋에 태그를 추가
```

### 나. 태그 확인

```bash
git log --decorate -1  #가장 최근 커밋 확인
git tag -l  #현재 저장소에있는 태그 리스트 확인
git show-ref --tags  #태그, 커밋 SHA-1 체크섬값 동시 확인
```

## 2. annotated 태그

- 태그 작성자, 작성일, 추가 메시지를 함께 남길 수 있는 태그

### 가. 태그 추가

```bash
git tag -a 태그명 SHA체크섬값
```
- 명령 실행 이후 추가 메시지를 작성할 수 있는 편집기 창 출력

### 나. 태그 확인

```bash
git show 태그명
```
- 커밋 정보에서 태그 작성자, 작성일, 추가 메시지 정보를 확인할 수 있음
