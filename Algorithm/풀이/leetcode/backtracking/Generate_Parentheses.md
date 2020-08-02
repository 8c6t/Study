Generate Parentheses
========

- 유형: 재귀, 백트래킹
- [https://leetcode.com/problems/generate-parentheses/](https://leetcode.com/problems/generate-parentheses/)
- 사용 언어: Java


## 문제

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```


## 풀이

```java
class Solution {
  public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    if (n == 0) return result;
    solve(result, "", n, n);
    return result;
  }

  public void solve(List<String> result, String s, int x, int y) {
    if (x < 0 || x > y) {
      return;
    }

    if (x == 0 && y == 0) {
      result.add(s);
    }

    solve(result, s + "(", x - 1, y);
    solve(result, s + ")", x, y - 1);
  }
}
```
- 상태공간 트리(state space tree)를 DFS로 탐색하는 백트래킹으로 해결
- 여는 괄호를 추가하는 메소드를 먼저 호출하고, 닫는 괄호를 여는 괄호보다 더 추가하지 않도록 하여(x > y) 적합한 괄호가 되도록 한다
