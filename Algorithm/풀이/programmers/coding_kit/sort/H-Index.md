# 프로그래머스 코딩테스트 연습 - H-Index

- 유형: 정렬
- [https://programmers.co.kr/learn/courses/30/lessons/42747](https://programmers.co.kr/learn/courses/30/lessons/42747)
- 사용 언어: Java


## 문제

H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.


## 유의사항

- 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
- 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.


```java
import java.util.*;

class Solution {
  public int solution(int[] citations) {
    int len = citations.length;
    int index = 0;
    
    int[] reverse = Arrays.stream(citations)
        .boxed()
        .sorted(Collections.reverseOrder())
        .mapToInt(e -> e)
        .toArray();

    while (index < len) {
      if (reverse[index] <= index) break;
      index++;
    }

    return index;
  }
}
```

## 핵심

- H-Index에 대한 이해
- 인용이 가장 많이 된 순으로 정렬한 뒤, 인덱스(h)를 늘려가며 해당 논문이 인덱스보다 많이 인용되었는지 확인
  - 논문이 n회 인용되었다면, n회 이하로도 인용이 되었다고 할 수 있으므로
