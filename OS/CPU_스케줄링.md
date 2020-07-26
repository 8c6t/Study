CPU 스케줄링
========

## 프로세스의 특성 분류

- I/O-bound process
  - CPU를 잡고 계산하는 시간보다 I/O에 많은 시간이 필요한 job
  - many short CPU bursts
- CPU-bound process
  - 계산 위주의 job
  - few very long CPU bursts


## CPU Scheduler & Dispatcher

- CPU Scheduler
  - Ready 상태의 프로세스 중에서 이번에 CPU를 줄 프로세스를 고른다
- Dispatcher
  - CPU의 제어권을 CPU scheduler에 의해 선택된 프로세스에게 넘긴다
  - 이 과정을 context switch(문맥 교환)라고 한다
- CPU 스케줄링이 필요한 경우는 프로세스에게 다음과 같은 상태 변화가 있는 경우이다
  1. Running -> Blocked (I/O 요청 시스템 콜 등)
  2. Running -> Ready (할당시간 만료로 timer interrupt)
  3. Blocked -> Ready (I/O 완료 후 인터럽트)
  4. Terminate

> 1, 4에서의 스케줄링은 nonpreemptive(=강제로 뺴앗지 않고 자진 반납)
> 나머지는 preemptive(=강제로 빼앗음)


## Scheduling Criteria

### 시스템 입장에서의 성능 척도

- CPU Utilization(이용률): CPU가 쉬지 않고 일 한 비율
- Throughput(처리량): 주어진 시간 동안 처리한 작업 수

### 프로세스 입장에서의 성능 척도

- Turnaround time(소요시간, 반환시간): 작업이 끝나기까지 걸린 총 시간(종료 시간 - 도착 시간)
- Waiting time(대기 시간): ready 큐에서 기다린 총 시간
- Response time(응답 시간): ready 큐에 들어와서 CPU를 얻기까지 걸린 시간


## 스케줄링 알고리즘

### FCFS

- First-Come First-Served
- 프로세스 도착 순서대로 처리
- 앞의 프로세스가 얼마나 시간을 차지하는지에 따라 대기 시간이 달라짐
- Convoy effect: 처리 시간이 긴 프로세스 뒤에 짧은 처리 시간을 가진 프로세스가 있는 경우

### SJF

- Shortest-Job-First
- 각 프로세스의 다음번 CPU burst time을 가지고 스케줄링에 활용
- CPU burst time이 가장 짧은 프로세스를 제일 먼저 스케줄
- 비선점형: 일단 CPU를 잡으면 이번 CPU burst가 완료될 때까지 CPU를 선점당하지 않음
- 선점형: 현재 수행중인 프로세스의 남은 burst time보다 더 짧은 CPU burst time을 가지는 새로운 프로세스가 도착하면 CPU를 빼앗김(SRTF)
- 주어진 프로세스들에 대해 최소 평균 대기 시간을 보장함(최선)
  - 어떤 스케줄링 알고리즘을 쓰더라도 이보다 짧을 수는 없음

#### SJF의 단점

- 극단적으로 CPU 사용 시간이 짧은 프로세스를 선호
- CPU 사용 시간이 긴 프로세스는 CPU를 선점하지 못 할 수도 있음(Starvation)
- CPU 사용 시간을 미리 알 수 없음
  - 추정만이 가능
  - 과거의 CPU Burst Time을 이용해서 추정


### Priority Scheduling

- 높은 우선순위를 가진 프로세스에게 CPU를 할당
  - 낮은 정수 = 높은 우선순위
- SJF는 일종의 우선순위 스케줄링
- Starving 현상이 있을 수 있음
  - Aging 기법을 통해 해결(시간이 지날수록 우선순위가 낮은 작업의 우선순위를 높임)


### Round Robbin

- 각 프로세스는 동일한 크기의 할당 시간(time quantum)을 가짐
  - 일반적으로 10-100 milliseconds
- 할당 시간이 지나면 프로세스는 선점당하고, ready queue의 제일 뒤에 다시 줄을 선다
- n개의 프로세스가 ready queue에 있고 할당 시간이 q time unit인 경우, 각 프로세스는 최대 q time unit 단위로 CPU 시간의 1/n을 가진다
  - 어떤 프로세스도 (n-1)q time unit 이상 기다리지 않는다
  - q 값이 크면 FIFO와 같이 작동하게 된다
  - q 값이 작게 되면 context switch 오버헤드가 커짐
- 응답 시간이 일반적으로 빠름


### Multilevel Queue

![multilevel](https://www.studytonight.com/operating-system/images/multi-level-scheduling-1.png)

- Ready Queue를 여럿으로 분리
  - foreground(interactive)
  - background(batch - no human interaction)
- 각 큐는 독립적인 스케줄링 알고리즘을 가짐
  - foreground: RR
  - background: FCFS
- 큐에 대한 스케줄링이 필요
  - Fixed priority scheduling
    - 우선순위가 높은 큐에 먼저 CPU를 할당. 우선순위가 높은 큐가 비었을 때 낮은 우선순위 큐에 CPU를 할당
    - Starvation 발생 가능성이 있음
  - Time slice
    - 각 큐에 CPU Time을 적절한 비율로 할당


### Multilevel Feedback Queue

- 프로세스가 다른 큐로 이동 가능
- 에이징을 이와 같은 방법으로 구현 가능
- Multilevel Feedback Queue 스케줄러를 정의하는 파라미터들
  - Queue의 수
  - 각 큐의 스케줄링 알고리즘
  - 프로세스를 상위 큐로 보내는 기준
  - 프로세스를 하위 큐로 내쫓는 기준
  - 프로세스가 CPU 서비스를 받으려 할 때 들어갈 큐를 결정하는 기준


## Multiple-Processor Scheduling

- CPU가 여러 개인 경우 스케줄링은 더욱 복잡해짐
- Homogeneous processor인 경우
  - Queue에 한줄로 세워서 각 프로세서가 알아서 꺼내가게 할 수 있다
  - 반드시 특정 프로세서에서 수행되어야 하는 프로세스가 있는 경우에는 문제가 더 복잡해짐
- Load sharing
  - 일부 프로세서에 job이 몰리지 않도록 부하를 적절히 공유하는 메커니즘 필요
  - 별개의 큐를 두는 방법 vs 공동 큐를 두는 방법
- Symmetric Multiprocessing(SMP)
  - 각 프로세서삭 각자 알아서 스케줄링 결정
- Asymmetric multiprocessing
  - 하나의 프로세서가 시스템 데이터의 접근과 공유흘 책임지고 나머지 프로세서는 거기에 따름


## Real-Time Scheduling

- Hard real-time systems
  - Hard real-time task는 정해진 시간 안에 반드시 끝내도록 스케줄링해야 함
- Soft real-time systems
  - Soft real-time task는 일반 프로세스에 비해 높은 우선순위를 갖도록 해야 함

## Thread Scheduling

- Local Scheduling
  - User level thread의 경우 **사용자 수준의 thread library**에 의해 어떤 thread를 스케줄할지 결정
- Global Scheduling
  - Kernal level thread의 경우 일반 프로세스와 마찬가지로 커널의 단기 스케줄러가 어떤 thread를 스케줄할지 결정


## Algorithm Evaluation

- Queueing models
  - 확률 분포로 주어지는 arrival rate와 service rate 등을 통해 각종 performance index 값을 계산
- Implementation(구현) & Measurement(성능 측정)
  - 실제 시스템에 알고리즘을 구현하여 실제 작업(workload)에 대해서 성능을 측정 비교
- Simulation(모의 실험)
  - 알고리즘을 모의 프로그램으로 작성 후 trace를 입력으로 하여 결과 비교
  
  
--------

출처) [운영체제 - 반효경(이화여대)](http://www.kocw.net/home/search/kemView.do?kemId=1046323&ar=pop)