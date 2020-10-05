Baseball Game
========

- 유형: 스택
- [https://leetcode.com/problems/baseball-game/](https://leetcode.com/problems/baseball-game/)
- 사용 언어: Java


## 문제

You are keeping score for a baseball game with strange rules. The game consists of several rounds, where the scores of past rounds may affect future rounds' scores.

At the beginning of the game, you start with an empty record. You are given a list of strings ops, where ops[i] is the ith operation you must apply to the record and is one of the following:

1. An integer x - Record a new score of x.
2. "+" - Record a new score that is the sum of the previous two scores. It is guaranteed there will always be two previous scores.
3. "D" - Record a new score that is double the previous score. It is guaranteed there will always be a previous score.
4. "C" - Invalidate the previous score, removing it from the record. It is guaranteed there will always be a previous score.

Return the sum of all the scores on the record.

## 풀이

```java
class Solution {
  public int calPoints(String[] ops) {
    Stack<Integer> stack = new Stack<>();
    int result = 0;

    for (String s : ops) {
      switch (s) {
        case "+":
          Integer a = stack.pop();
          Integer b = stack.peek();

          stack.push(a);
          stack.push(a + b);
          break;
        case "D":
          stack.push(stack.peek() * 2);
          break;
        case "C":
          stack.pop();
          break;
        default:
          stack.push(Integer.valueOf(s));
          break;
      }
    }

    while (!stack.isEmpty()) {
      result += stack.pop();
    }

    return result;
  }
}
```

- 주어진 규칙에 맞게 야구 게임의 결과를 계산하여 반환하는 문제
- 스택을 이용하여 연산 시 필요한 이전 값을 참조할 수 있도록 한다
