 Kth Largest Element in an Array
========

- 유형: Sort
- [https://leetcode.com/problems/kth-largest-element-in-an-array/](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- 사용 언어: Java


## 문제

Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.


## 풀이

```java
class Solution {
  public int findKthLargest(int[] nums, int k) {
    Arrays.sort(nums);
    return nums[nums.length - k];
  }
}
```

- 주어진 배열에서 k번째로 큰 수를 찾는 문제
- 중복된 값에 대한 별도의 처리를 요구하지 않으므로 정렬 후 전체 크기에서 k를 뺀만큼의 인덱스 값을 반환하면 된다
