Permutations
========

- 유형: 재귀, 백트래킹
- [https://leetcode.com/problems/permutations/](https://leetcode.com/problems/permutations/)
- 사용 언어: Java


## 문제

Given a collection of distinct integers, return all possible permutations.


## 풀이

```java
class Solution {
  public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    if (nums.length == 0) {
      return result;
    }
    
    solve(result, new ArrayList<Integer>(), nums);
    
    return result;
  }
  
  public void solve(List<List<Integer>> result, List<Integer> curr, int[] nums) {         
    if (curr.size() == nums.length) {
      result.add(new ArrayList(curr));
      return;
    } 
    
    for (int num : nums) {
      if (curr.contains(num)) {
        continue;
      }
      
      curr.add(num);
      solve(result, curr, nums);
      curr.remove(curr.size() - 1);
    }  
  }
}
```
- 순열(Permutation)을 구하는 문제
- 상태공간 트리(state space tree)를 DFS로 탐색하는 백트래킹으로 해결
- 주어진 배열을 순회하며 해당 값이 없는 경우 리스트에 저장
- 재귀함수 호출 뒤 해당 값을 제거하여 백트래킹 구현
- 주어진 배열의 크기만큼 리스트에 값이 들어있는 경우, 결과에 저장하고 재귀 호출을 종료
