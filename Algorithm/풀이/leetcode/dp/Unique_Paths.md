Unique Paths
========

- 유형: DP
- [https://leetcode.com/problems/unique-paths/](https://leetcode.com/problems/unique-paths/)
- 사용 언어: Java


## 문제

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?


## 풀이

```java
class Solution {
  public int uniquePaths(int m, int n) {
    int[][] paths = new int[m + 1][n + 1];
    paths[1][1] = 1;

    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (i == 1 && j == 1) continue;
        paths[i][j] = paths[i-1][j] + paths[i][j-1];
      }
    }

    return paths[m][n];
  }
}
```
- (0, 0) 에서 (m, n)으로 가는 최단 경로의 수를 구하는 문제
- paths[i][j]는 (i, j)로 가는 최단 경로의 수
- 로봇은 아래나 오른쪽으로만 이동이 가능하기 때문에 (i, j)는 (i - 1, j)와 (i, j - 1) 에서만 올 수 있다
- paths[i][j] = paths[i - 1][j] + paths[i][j - 1]
