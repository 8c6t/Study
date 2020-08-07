Longest Substring Without Repeating Characters
========

- 유형: 배열, 포인터
- [https://leetcode.com/problems/longest-substring-without-repeating-characters/](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- 사용 언어: Java


## 문제

Given a string, find the length of the longest substring without repeating characters.

## 풀이

```java
class Solution {
  public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    
    int result = 0;
    int start = 0;
    int end = 0;
    
    while(end < s.length()) {
      char c = s.charAt(end);
      
      if (map.containsKey(c)) {
        start = Math.max(map.get(c), start);
      }
      
      result = Math.max(result, end - start + 1);
      map.put(c, ++end);
    }
    
    return result;
  }
}
```

- 중복을 검사하고 인덱스를 저장할 Map과 두 개의 포인터(start, end)를 이용해서 풀이
- 중복되는 값이 있으면 안 되므로, 시작점은 중복값의 인덱스보다 같거나 더 커야 한다
