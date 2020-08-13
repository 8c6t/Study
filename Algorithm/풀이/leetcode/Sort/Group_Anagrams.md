Group Anagrams
========

- 유형: String, Sort
- [https://leetcode.com/problems/group-anagrams/](https://leetcode.com/problems/group-anagrams/)
- 사용 언어: Java


## 문제

Given an array of strings, group anagrams together.

## 풀이

```java
class Solution {
  public List<List<String>> groupAnagrams(String[] strs) {
    List<List<String>> result = new ArrayList<>();

    if (strs == null || strs.length == 0) {
      return result;
    }

    Map<String, List<String>> map = new HashMap<>();

    for (int i = 0; i < strs.length; i++) {
      char[] chars = strs[i].toCharArray();
      Arrays.sort(chars);
      String key = String.valueOf(chars);

      if (map.containsKey(key)) {
        map.get(key).add(strs[i]);
      } else {
        List<String> value = new ArrayList<>();
        value.add(strs[i]);
        map.put(key, value);
      }
    }

    result.addAll(map.values());
    return result;
  }
}
```

- 주어진 문자열 배열 중에서 아나그램끼리 리스트를 만들어 반환하는 문제
- 문자열이 char의 배열이라는 점을 이용하여 char 배열로 변환 후 정렬한 뒤, 중복되는 값이 있는지 확인
- 같은 값이 있다면 아나그램이므로 값을 저장
