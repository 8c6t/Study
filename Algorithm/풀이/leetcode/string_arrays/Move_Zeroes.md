Move Zeroes
========

- 유형: 배열
- [https://leetcode.com/problems/move-zeroes/](https://leetcode.com/problems/move-zeroes/)
- 사용 언어: Java


## 문제

Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

## 풀이

```java
class Solution {
  public void moveZeroes(int[] nums) {
    int currentIndex = 0;
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] != 0) {
        nums[currentIndex++] = nums[i];
      }
    }

    while (currentIndex < nums.length) {
      nums[currentIndex++] = 0;
    }

  }   
}
```

- 주어진 배열에서 값이 0인 요소를 뒤로 옮기는 문제
- 배열을 순회하면서 해당 요소의 값이 0이 아닌 경우, 0이 아닌 값이 이동해야 할 인덱스 값인 currentIndex로 해당 값을 옮긴다
- 이후 남은 길이만큼 해당 배열의 요소 값을 0으로 대입
