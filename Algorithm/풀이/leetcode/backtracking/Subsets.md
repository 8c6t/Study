Subsets
========

- 유형: 재귀, 백트래킹
- [https://leetcode.com/problems/subsets/](https://leetcode.com/problems/subsets/)
- 사용 언어: Java


## 문제

Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.


## 풀이

```java
class Solution {
  public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    List<Integer> list = new ArrayList<>();
    if (nums == null || nums.length == 0) {
      return result;
    }

    solve(nums, result, list, 0);

    return result;
  }

  private void solve(int[] nums, List<List<Integer>> result, List<Integer> curr, int start) {
    List<Integer> list = new ArrayList<>(curr);
    result.add(list);

    for (int i = start; i < nums.length; i++) {
      curr.add(nums[i]);
      solve(nums, result, curr, i + 1);
      curr.remove(curr.size() - 1);
    }
  }
}
```
- 멱집합(powerset)을 구하는 문제
- 상태공간 트리(state space tree)를 DFS로 탐색하는 백트래킹으로 해결
