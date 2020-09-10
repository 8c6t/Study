Jump Game
========

- 유형: 그래프, 그리디
- [https://leetcode.com/problems/jump-game/](https://leetcode.com/problems/jump-game/)
- 사용 언어: Java


## 문제

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.


## 풀이 - DFS

```java
class Solution {
    
  public boolean canJump(int[] nums) {    
    boolean[] can = new boolean[nums.length];
    can[0] = true;
    
    for (int i = 1; i <= nums[0] && i < nums.length; i++) {
      dfs(nums, i, can);    
    }
    
    return can[nums.length - 1];
  }
  
  private void dfs(int[] nums, int curr, boolean[] can) {
    if (can[curr]) return;
    can[curr] = true;
    
    for (int i = 1; i <= nums[curr] && curr + i < nums.length; i++) {
      dfs(nums, curr + i, can);
    }
      
  }
}
```

- 첫번째 인덱스에서부터 마지막 인덱스까지 이동할 수 있는지 여부를 반환하는 문제
- 배열을 DFS로 모두 순환한 뒤 마지막 인덱스의 값을 반환


### 풀이 - 그리디

```java
class Solution {
    
  public boolean canJump(int[] nums) {    
    int lastPos = nums.length - 1;
    for (int i = nums.length - 1; i >= 0; i--) {
      if (i + nums[i] >= lastPos) {
        lastPos = i;
      }
    }
    return lastPos == 0;
  }
    
}
```

- 역으로 배열을 순회하면서 시작점으로 갈 수 있는지를 확인
- 현재 인덱스와 그 값의 합이 마지막 위치보다 크다면 해당 위치로 갈 수 있음
