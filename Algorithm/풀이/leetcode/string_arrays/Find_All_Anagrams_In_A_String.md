Find All Anagrams in a String
========

- 유형: Array
- [https://leetcode.com/problems/find-all-anagrams-in-a-string/](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- 사용 언어: Java


## 문제

Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.

The order of output does not matter.


## 풀이

```java
class Solution {
  public List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    
    if (s == null || p == null) return result;
    
    int ns = s.length();
    int np = p.length();
    
    if (np > ns) return result;
    
    int[] map_s = new int[26];
    int[] map_p = new int[26];
    
    for (int i = 0; i < np; i ++) {
      map_p[p.charAt(i) - 'a']++;
    }
    
    for (int i = 0; i < ns; i ++) {
      map_s[s.charAt(i) - 'a']++;
      
      if (i >= np) {
        map_s[s.charAt(i - np) - 'a']--;
      }
      
      if (Arrays.equals(map_s, map_p)) {
        result.add(i - np + 1);
      }
    }
    
    return result;
  }
}
```

- 주어진 문자열 s에서 p의 아나그램을 찾는 문제
- 알파벳 소문자만을 입력받으므로 아나그램 여부를 판별할 배열(map_s, map_p)의 크기를 26으로 정함
- p의 각 알파벳에 대응되는 인덱스 값을 상승시켜 둔다
- 문자열 s를 순회하면서 각 알파벳에 대응되는 인덱스 값을 상승시킨다
  - p의 길이를 넘었다면 첫 자리 값을 빼도록 처리한다
- map_s와 map_p가 동일하다면 아나그램이므로 첫 인덱스 값을 결과에 저장
