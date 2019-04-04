도커 MySQL, MongoDB 설정
========


## 1. 이미지 다운로드

```bash
docker pull mysql
docker pull mongo
```

- 특정 버전 지정이 필요하다면 이미지명 뒤에 `:버전`(태그) 기재
  - ex) `docker pull mysql:5.7`


## 2. 이미지 확인

```bash
docker images

REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
mongo                      latest              4456f3d84674        5 days ago          409MB
mysql                      latest              7bb2586065cd        8 days ago          477MB
docker4w/nsenter-dockerd   latest              2f1c802f322f        5 months ago        187kB
```

- 다운로드한 이미지 목록들을 출력

## 3. 컨테이너 생성 및 실행(run)

```bash
docker run -d \
 -p 호스트포트:컨테이너포트 \
 -v 호스트경로(혹은 볼륨명):컨테이너경로(datadir) \
 -e 환경변수 \
 --name 컨테이너명 \
 이미지명
```

- `run`: 컨테이너 생성과 실행을 동시에 진행하는 명령어(create + start)
- `-d`: detached 모드. 컨테이너가 백그라운드에서 실행됨
- `-p`: 호스트에 연결된 컨테이너의 특정 포트를 외부에 노출시킴
- `-v`: 호스트 디렉토리 혹은 도커 볼륨과 컨테이너 디렉토리를 연결
  - 다른 컨테이너를 생성할 때, 이전에 사용했던 디렉토리를 연결시키면 관련 자료를 그대로 사용할 수 있다
- `-e` : 컨테이너 환경 변수 설정
- `--name` : 생성할 컨테이너의 이름 설정. 해당 옵션 생략 시 임의의 컨테이너명을 부여

> ※ 이외에도 다양한 옵션이 존재함. [참고](http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter20/28)<br>
> ※ 옵션, 환경 변수가 많아진다면 docker-compose로 관리하는 것이 편하다

### 가. MySQL

```bash
docker run -d \
  -p 3306:3306 \
  -v 호스트경로:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=비밀번호 \
  --name mysql_test \
  mysql
```

#### 디렉토리 연결
- mysql의 데이터 저장 경로(datadir)는 `/var/lib/mysql`
- 윈도우 호스트의 디렉토리를 연결하고자 한다면 Docker 설정에서 Shared Driver 설정을 먼저 해야한다
- 이후 호스트 경로에 윈도우 호스트의 디렉토리 경로를 적는다. 해당 경로의 디렉토리가 존재하여야 함
- ex) `-v c:/Users/8c6t/docker/mysql:/var/lib/mysql`

#### 컨테이너 환경 변수
- MySQL은 **MYSQL_ROOT_PASSWORD(root 계정 비밀번호 설정) 환경변수 설정이 필수**
- 비밀번호 없이 root 계정을 생성하고 싶다면 `MYSQL_ALLOW_EMPTY_PASSWORD` 환경변수를 설정한다


### 나. MongoDB

```bash
docker run -d \
  -p 27017:27017 \
  -v 호스트경로:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=계정명 \
  -e MONGO_INITDB_ROOT_PASSWORD=비밀번호 \
  --name mongo_node \
  mongo
```

#### 디렉토리 연결
- mongodb의 데이터 저장 경로(datadir)는 `/data/db`
- **윈도우나 OS X**에서 데이터 디렉토리를 직접 호스트 디렉토리와 매핑한 경우, 파일 공유 메커니즘의 문제로 인해 **몽고DB 컨테이너 실행 불가**
- 도커에서 볼륨을 생성하고(VM 내), 매핑해야 한다
- ex) `docker volume create --name=mongo_test_volume` -> `-v mongo_test_volume:/data/db`

> 참고: [도커 몽고DB 문서](https://hub.docker.com/_/mongo)


#### 컨테이너 환경 변수
- `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` 환경 변수를 설정한 경우 admin 인증 DB에 해당 계정명, 비밀번호를 사용하는, **root 권한을 가진 계정**을 생성한다
- 두 환경 변수가 존재할 경우 **authentication이 활성화**됨. (`mongod --auth`)
- 두 환경 변수를 생략하면 authentication이 비활성화된 환경으로 구성된다


## 4. 컨테이너 목록 출력

```bash
docker ps -a

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
cf1f940fd2e3        mongo               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        0.0.0.0:27017->27017/tcp            mongo_test
f7ab0c1b73ca        mysql               "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        0.0.0.0:3306->3306/tcp, 33060/tcp   mysql_test
```

- 설정 상의 문제로 컨테이너가 바로 종료되는 경우도 있기 때문에, `-a` 옵션으로 모든 컨테이너 목록를 확인


## 5. 컨테이너 BASH 쉘 접속

```bash
docker exec -it 컨테이너명 bash
```

- `-i`: 표준 입력(stdin) 활성화
- `-t`: tty모드 사용. bash쉘 사용시 해당 옵션 필요


## 6. 컨테이너 시작/종료/재시작

```bash
docker start 컨테이너명(혹은 컨테이너ID)    // 시작
docker stop 컨테이너명(혹은 컨테이너ID)     // 종료
docker restart 컨테이너명(혹은 컨테이너ID)  // 재시작
```

#### ※ 현재 실행 중인 컨테이너 일괄 종료
`docker ps -a -q | ForEach { docker stop $_ }`


## 7. 컨테이너/이미지 삭제

```bash
docker rm 컨테이너명(혹은 컨테이너 ID)
docker rmi 이미지명
```

- 컨테이너 삭제 시 해당 컨테이너는 종료된 상태여야 한다
- 이미지 삭제 시 해당 이미지를 사용하는 컨테이너가 없어야 한다


## ※ MySQL 기본 설정

bash에서 작업하여도 되고, worckbench 등의 툴을 사용하여도 된다

### 1. MySQL 계정 생성

```bash
CREATE USER '유저명'@'접속IP' IDENTIFIED WITH mysql_native_password BY '비밀번호';
GRANT ALL ON *.* TO '유저명'@'접속IP';
FLUSH PRIVILEGES;
```

- root 계정을 사용하기보다 계정을 새로 생성하여 사용하는 것이 바람직함
- MySQL 8.0 이후에는 인증 방식이 변경되어 레거시 인증 방식을 사용하는 모듈에서 정상적으로 작동하지 않을 수 있음
  - 시퀄라이즈의 경우 SequelizeConnectionError가 발생
- mysql_native_password로 설정해서 레거시 인증 방식을 사용하도록 한다


### 2. MySQL root 계정 외부 접속 막기

```bash
DELETE FROM mysql.user WHERE host='%' AND user='root';
FLUSH PRIVILEGES;
```

- 도커 official mysql 이미지는 기본적으로 모든 IP에 대해 root 계정 접속을 허용하도록 되어있음
- root 계정은 로컬에서만 접속될 수 있도록 외부 접속 설정을 제거

--------

노드 교과서 실습 중 DB 관련 작업을 도커를 사용하며 있었던 일련의 진행 과정을 정리해보았다.

윈도우 환경에서 도커를 사용했던지라 문제가 되었던 몽고DB 호스트 볼륨 마운트 과정을 제외하면 큰 어려움은 없었다.