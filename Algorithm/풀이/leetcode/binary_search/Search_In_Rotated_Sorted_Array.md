Search in Rotated Sorted Array
========

- 유형: 이진 탐색
- [https://leetcode.com/problems/search-in-rotated-sorted-array/](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- 사용 언어: Java


## 문제

Given an integer array nums sorted in ascending order, and an integer target.

Suppose that nums is rotated at some pivot unknown to you beforehand (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

You should search for target in nums and if you found return its index, otherwise return -1.


## 풀이

```java
class Solution {
  public int search(int[] nums, int target) {
    if (nums.length == 0) {
      return -1;
    }
    
    int left = 0;
    int right = nums.length - 1;
    
    while (left < right) {
      int mid = (left + right) / 2;
      if (nums[mid] == target) {
        return mid;
      }
      
      if (nums[left] <= nums[mid]) {
        if (nums[left] <= target && target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        if (nums[mid] < target && target <= nums[right]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
    
    return nums[left] == target ? left : -1;
  }
}
```
- nums 배열에서 target이 몇 번째 인덱스에 있는지 찾는 문제
- 이진 탐색을 활용하여 target이 mid 인덱스의 값이면 해당 인덱스를 리턴
- mid 인덱스 값이 target과 같지 않다면, left와 right 값을 변경하기 위한 조건문을 실행
- 일반적인 이진 탐색에서 배열이 특정 값을 기준으로 회전한 상태임을 감안하여 범위를 줄여나가야 한다
