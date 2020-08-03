Bulb Switcher III
========

- 유형: 힙
- [https://leetcode.com/problems/permutations/](https://leetcode.com/problems/permutations/)
- 사용 언어: Java


## 문제

There is a room with n bulbs, numbered from 1 to n, arranged in a row from left to right. Initially, all the bulbs are turned off.

At moment k (for k from 0 to n - 1), we turn on the light[k] bulb. A bulb change color to blue only if it is on and all the previous bulbs (to the left) are turned on too.

Return the number of moments in which all turned on bulbs are blue.


## 풀이

```java
class Solution {
  public int numTimesAllBlue(int[] light) {
    PriorityQueue<Integer> queue = new PriorityQueue<>((a, b) -> b - a);
    
    int result = 0;
    for (int bulb : light) {
      queue.offer(bulb);
      
      if (queue.peek() == queue.size()) {
        result++;
      }
    }
    
    return result;
  }
}
```

- 최대 힙을 이용하여 풀이
- 전구가 푸른 색이 되려면 좌측의 모든 전구가 켜져 있어야 한다
- 전구의 인덱스 값을 우선순위 큐에 넣은 뒤, 최상단 값과 큐의 크기를 비교
  - 그 값이 동일하다면 모든 전구가 푸른색
  - 큐의 크기는 최대값 이전의 켜진 전구의 수를 의미한다
  