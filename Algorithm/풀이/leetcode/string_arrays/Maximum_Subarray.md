Maximum Subarray
========

- 유형: Array
- [https://leetcode.com/problems/maximum-subarray/](https://leetcode.com/problems/maximum-subarray/)
- 사용 언어: Java


## 문제

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

## 풀이

```java
class Solution {
  public int maxSubArray(int[] nums) {
    int newSum = nums[0];
    int max = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
      newSum = Math.max(nums[i], newSum + nums[i]);
      max = Math.max(newSum, max);
    }
    
    return max;
  }
}
```

- 배열의 연속되는 부분집합 중 합이 가장 큰 경우를 구하는 문제
- 이전의 부분집합의 합과 현재 인덱스의 값을 비교, 둘 중 큰 값이 현재 인덱스에서 구할 수 있는 최대 합이 된다(카데인 알고리즘)
