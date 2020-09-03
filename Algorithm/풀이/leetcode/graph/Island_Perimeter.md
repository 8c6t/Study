Island Perimeter
========

- 유형: 그래프
- [https://leetcode.com/problems/island-perimeter/](https://leetcode.com/problems/island-perimeter//)
- 사용 언어: Java


## 문제

Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)


## 풀이

```java
class Solution {
    
  static int[] dx = {-1, 0, 0, 1};
  static int[] dy = {0, -1, 1, 0};
  
  public int maxAreaOfIsland(int[][] grid) {
    int row = grid.length;
    int col = grid[0].length;

    if (grid == null || row == 0 || col == 0) {
      return 0;
    }

    int result = 0;
    for (int i = 0; i < row; i++) {
      for (int j = 0; j < col; j++) {
        if (grid[i][j] == 1) {
          result = Math.max(result, dfs(grid, i, j, 0));
        }
      }
    }

    return result;
  }
  
  
  public int dfs(int[][] grid, int x, int y, int count) {
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] != 1) {
      return count;
    }

    grid[x][y] = 0;
    count++;
    
    for (int i = 0; i < 4; i++) {
      count = dfs(grid, x + dx[i], y + dy[i], count);
    }

    return count;
  }
    
}
```

- 주어진 지도상에 존재하는 섬 중 가장 큰 섬의 크기를 반환하는 문제
- DFS 혹은 BFS로 탐색하며 하나의 섬에 해당되는 경우 그 크기를 반환하도록 만든다
- 그 중 가장 큰 값을 반환
