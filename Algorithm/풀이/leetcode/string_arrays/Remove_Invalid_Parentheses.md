Remove Invalid Parentheses
========

- 유형: String
- [https://leetcode.com/problems/remove-invalid-parentheses/](https://leetcode.com/problems/remove-invalid-parentheses/)
- 사용 언어: Java


## 문제

Remove the minimum number of invalid parentheses in order to make the input string valid. Return all possible results.

Note: The input string may contain letters other than the parentheses ( and ).

## 풀이

```java
class Solution {
  public List<String> removeInvalidParentheses(String s) {
    List<String> result = new ArrayList<>();
    if (s == null) {
      return result;
    }

    Queue<String> queue = new LinkedList<>();
    Set<String> check = new HashSet<>();

    queue.offer(s);
    check.add(s);

    boolean found = false;

    while (!queue.isEmpty()) {
      int size = queue.size();
      for (int i = 0; i < size; i++) {
        String curr = queue.poll();

        if (isValid(curr)) {
          result.add(curr);
          found = true;
        }

        if (found) continue;

        for (int j = 0; j < curr.length(); j++) {
          if (curr.charAt(j) != '(' && curr.charAt(j) != ')') {
            continue;
          }

          String newStr = curr.substring(0, j) + curr.substring(j + 1);
          if (!check.contains(newStr)) {
            queue.offer(newStr);
            check.add(newStr);
          }
        }
      }
    }

    return result;
  }

  public boolean isValid(String str) {
    int len = 0;
    for(char c : str.toCharArray()) {
      if (c == '(') {
        len++;
      } else if (c == ')') {
        len--;
        if (len < 0) return false;
      }
    }
    return len == 0;
  }
}
```

- 주어진 문자열에서 최소한으로 문자를 지워가며 올바른 괄호를 가진 문자열을 모두 반환하는 문제
- 문자를 지워나가며 올바른 괄호를 가진 문자열이 되는지 확인
- 중복된 문자열을 제외시키기 위해 Set을 이용
- 한 번이라도 올바른 괄호를 가진 문자열이 되었다면, 그보다 문자를 더 지울 필요가 없다
- 올바른 괄호인지 검증을 하는 방법은 여는 괄호일 때는 더하고, 닫는 괄호일 때는 빼면서 중간에 음수가 되지 않고 0이 되는지를 확인한다
