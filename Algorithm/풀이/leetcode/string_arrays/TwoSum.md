Two Sum
========

- 유형: 배열
- [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)
- 사용 언어: Java


## 문제

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.


## 풀이

```java
class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    int[] result = new int[2];
    
    for (int i = 0; i < nums.length; i++) {
      int num = nums[i];
      
      if (map.containsKey(num)) {
        result[0] = map.get(num);
        result[1] = i;
        break;
      }
      
      map.put(target-num, i);
    }
    
    return result;
  }
}
```

- 주어진 배열에서 두 수를 더해 target을 만들 수 있는 수들의 인덱스를 반환하는 문제
- 브루트 포스로 풀이 시 O(N^2)이 나오므로 바람직하지 않다
- Map을 이용하여 풀이
  - 키: target - 현재 값. target을 만들기 위해 필요한 값
  - 값: 현재 값의 인덱스
  - Map 내에 해당 키가 있다면 target을 만들 수 있음
