License Key Formatting
========

- 유형: String
- [https://leetcode.com/problems/license-key-formatting/](https://leetcode.com/problems/license-key-formatting/)
- 사용 언어: Java


## 문제

You are given a license key represented as a string S which consists only alphanumeric character and dashes. The string is separated into N+1 groups by N dashes.

Given a number K, we would want to reformat the strings such that each group contains exactly K characters, except for the first group which could be shorter than K, but still must contain at least one character. Furthermore, there must be a dash inserted between two groups and all lowercase letters should be converted to uppercase.

Given a non-empty string S and a number K, format the string according to the rules described above.


## 풀이

```java
class Solution {
  public String licenseKeyFormatting(String S, int K) {
    String s2 = S.replace("-", "").toUpperCase();

    StringBuilder sb = new StringBuilder(s2);
    for (int i = s2.length() - K; i > 0; i = i - K) {
      sb.insert(i, "-");
    }

    return sb.toString();
}
}
```

- 주어진 문자열을 라이센스 키 형태로 바꾸는 문제
- K번째 수만큼 `-`을 를 추가하므로, 문자열 내의 `-`를 지우고 알파벳 소문자를 대문자로 바꾼다
- 뒤에서부터 K씩 감소하면서 `-`을 삽입
