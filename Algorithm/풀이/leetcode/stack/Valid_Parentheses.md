Valid Parentheses
========

- 유형: Stack
- [https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/)
- 사용 언어: Java


## 문제

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

## 풀이

```java
class Solution {
  public boolean isValid(String s) {
    if (s.length() % 2 != 0) {
      return false;
    }

    Stack<Character> stack = new Stack<>();

    for (char c : s.toCharArray()) {
      switch (c) {
        case ')': {
          check(stack, '(');
          break;
        }
        case ']': {
          check(stack, '[');
          break;
        }
        case '}': {
          check(stack, '{');
          break;
        }
        default:
          stack.push(c);
          break;
      }
    }

    return stack.isEmpty();
  }

  private static void check(Stack<Character> stack, char c) {
    if (!stack.isEmpty() && stack.peek() == c) {
      stack.pop();
    }
  }
    
}
```

- 입력된 문자열의 값이 유효한 괄호인지 확인하는 문제
- 스택을 사용하여 직전에 입력된 값이 짝이 맞는 괄호인지 확인한다
- 스택이 비었다면 유효한 괄호로만 구성된 문자열
