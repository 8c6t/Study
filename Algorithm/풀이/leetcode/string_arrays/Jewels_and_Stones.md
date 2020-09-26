Jewels and Stones
========

- 유형: String
- [https://leetcode.com/problems/jewels-and-stones/](https://leetcode.com/problems/jewels-and-stones/)
- 사용 언어: Java


## 문제

You're given strings J representing the types of stones that are jewels, and S representing the stones you have.  Each character in S is a type of stone you have.  You want to know how many of the stones you have are also jewels.

The letters in J are guaranteed distinct, and all characters in J and S are letters. Letters are case sensitive, so "a" is considered a different type of stone from "A".

## 풀이

```java
class Solution {
  public int numJewelsInStones(String J, String S) {
    Set<Character> set = new HashSet<>();
    int count = 0;

    for (char c : J.toCharArray()) {
      set.add(c);
    }

    for (char c : S.toCharArray()) {
      if (set.contains(c)) {
        count++;
      }
    }

    return count;
  }
}
```

- 주어진 J라는 문자열에 S의 각 문자가 몇 개 있는지 세는 문제
- 중복을 제거하기 위해 Set을 이용하여 S의 각 문자를 저장
- 문자열을 순회하면서 Set에 저장된 문자가 있는지 확인
