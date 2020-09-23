Max Area of Island
========

- 유형: 그래프
- [https://leetcode.com/problems/max-area-of-island/](https://leetcode.com/problems/max-area-of-island/)
- 사용 언어: Java


## 문제

Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)


## 풀이 - DFS

```java
class Solution {
  public int maxAreaOfIsland(int[][] grid) {
    int result = 0;
    
    if (grid == null || grid.length == 0) {
      return result;
    }
    
    for (int i = 0; i < grid.length; i++) {
      for (int j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == 1) {
          result = Math.max(result, dfs(i, j, grid));
        }
      }
    }
    
    return result;
  }
  
  public int dfs(int x, int y, int[][] grid) {
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] != 1) {
      return 0;
    }
    
    grid[x][y] = 2;
    
    return 1 + dfs(x + 1, y, grid) + dfs(x, y + 1, grid) + dfs(x - 1, y, grid) + dfs(x, y - 1, grid);  
  }
}
```

## 풀이 - BFS

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
          result = Math.max(result, bfs(grid, i, j));
        }
      }
    }

    return result;
  }

  public int bfs(int[][] grid, int x, int y) {
    Queue<int[]> queue = new LinkedList<>();
    queue.add(new int[] { x, y });
    grid[x][y] = -1;

    int max = 0;
    while (!queue.isEmpty()) {
      int size = queue.size();
      max += size;

      for (int i = 0; i < size; i++) {
        int[] curr = queue.poll();

        for (int j = 0; j < 4; j++) {
          int nx = curr[0] + dx[j];
          int ny = curr[1] + dy[j];

          if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length && grid[nx][ny] == 1) {
            queue.add(new int[] { nx, ny });
            grid[nx][ny] = -1;
          }
        }
      }
    }
    return max;
  }
}
```

- 주어진 지도에서 가장 큰 면적을 가진 섬의 면적을 반환하는 문제
- DFS 혹은 BFS로 순회하며 섬의 면적을 구하고, 그 중 가장 큰 값을 반환한다
