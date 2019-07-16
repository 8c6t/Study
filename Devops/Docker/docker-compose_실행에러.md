windows 환경에서 docker-compose 실행 시 에러 발생
========

## 문제

```bash
$ docker-compose up -d
[10464] Failed to execute script docker-compose
Traceback (most recent call last):
  File "docker-compose", line 6, in <module>
  File "compose\cli\main.py", line 71, in main
  File "compose\cli\main.py", line 124, in perform_command
  File "compose\cli\command.py", line 42, in project_from_options
  File "compose\cli\command.py", line 128, in get_project
  File "compose\project.py", line 100, in from_config
  File "compose\network.py", line 320, in get_networks
  File "compose\network.py", line 125, in true_name
  File "compose\network.py", line 146, in _set_legacy_flag
  File "compose\network.py", line 106, in inspect
  File "site-packages\docker\utils\decorators.py", line 19, in wrapped
  File "site-packages\docker\api\network.py", line 211, in inspect_network
  File "site-packages\docker\utils\decorators.py", line 46, in inner
  File "site-packages\docker\api\client.py", line 215, in _get
  File "site-packages\requests\sessions.py", line 537, in get
  File "site-packages\requests\sessions.py", line 515, in request
  File "site-packages\requests\sessions.py", line 691, in merge_environment_settings
  File "site-packages\requests\utils.py", line 759, in get_environ_proxies
  File "site-packages\requests\utils.py", line 743, in should_bypass_proxies
  File "site-packages\requests\utils.py", line 93, in proxy_bypass
  File "site-packages\requests\utils.py", line 59, in proxy_bypass_registry
ValueError: invalid literal for int() with base 10: b'\x00\x00\x00\x00'
```

- windows 환경에서 docker-compose 실행 시 다음과 같은 에러와 함께 실행되지 않는 문제가 발생
- docker-compose 파일을 잘못 작성했을 것으로 추측했지만, 회사 PC나 개인 노트북에서는 잘 실행되고 개인 PC에서만 안 되는걸로 보아 파일에는 문제가 없는 것으로 판단
- 구글링을 해봐도 동일 사례를 찾을 수 없어 없어 윈도우 클린 설치도 해보고 docker 버전도 낮추어보았지만 해결 불가
- windows docker 설치 시 같이 설치되는 docker compose에 문제가 있는게 아닌가 싶어 pip로 설치를 시도하는 과정에서 동일한 에러가 발생
- 그제서야 에러 내역에 집중... 프록시 레지스트리 값에 문제가 있을 것으로 추측


## 해결책

레지스트리 편집기에서 `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings` 의 `ProxyEnable`의 타입을 Binary에서 DWORD로 변경

- 정상 실행이 되는 PC들의 해당 레지스트리 타입은 DWORD였는데 문제가 된 PC는 Binary
- 윈도우 클린 설치 직후 해당 레지스트리 타입을 확인해봐도 타입이 달랐다
- PC간 차이점이라면 CPU가 인텔이냐 AMD이냐 정도인데 이게 원인인가 싶기도 하고...
- 아무튼 해결. 이제는 정상 작동함
