Palindrome Number
========

- 유형: 그리디
- [https://leetcode.com/problems/palindrome-number/](https://leetcode.com/problems/palindrome-number/)
- 사용 언어: Java


## 문제

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.


## 풀이

```java
class Solution {
  public boolean isPalindrome(int x) {
    if (x < 0) {
      return false;
    }

    int target = x;
    int sum = 0;

    while (x > 0) {
      sum *= 10;
      sum += x % 10;
      x /= 10;
    }

    return target == sum;
  }
}
```

- 주어진 수가 팰린드롬인지 확인하는 문제. 문자열 변환을 하지 않고 해결해볼 것
- 주어진 수의 뒷 자리부터 더해가며 뒤집어진 결과를 만든 뒤, 원래 수와 더한 값이 같은지 확인
