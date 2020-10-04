Daily Temperatures
========

- 유형: 스택
- [https://leetcode.com/problems/daily-temperatures/](https://leetcode.com/problems/daily-temperatures/)
- 사용 언어: Java


## 문제

Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].


## 풀이

```java
class Solution {
  public int[] dailyTemperatures(int[] T) {
    Stack<Integer> stack = new Stack<>();
    int[] result = new int[T.length];

    for (int i = 0; i < T.length; i++) {
      while (!stack.isEmpty() && T[stack.peek()] < T[i]) {
        int index = stack.pop();
        result[index] = i - index;
      }
      stack.push(i);
    }
    return result;
  }
}
```

- 일일 온도가 더 높아지기까지 걸리는 날짜를 구한 배열을 반환하는 문제
- 스택의 top 값에 해당하는 날짜의 온도가 현재 온도보다 낮다면 그 값을 꺼낸 뒤 날짜 간 차이를 저장하는 과정을 반복
  - 이로서 현재 기온보다 낮은 기온을 가진 날짜는 스택에 보관되지 않는다
- 스택에 현재 인덱스 값을 보관