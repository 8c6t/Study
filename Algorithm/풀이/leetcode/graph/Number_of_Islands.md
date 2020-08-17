Number of Islands
========

- 유형: 그래프
- [https://leetcode.com/problems/number-of-islands/](https://leetcode.com/problems/number-of-islands/)
- 사용 언어: Java


## 문제

Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


## 풀이

```java
class Solution {
    
  static int[] dx = {0, 0, -1, 1};
  static int[] dy = {1, -1, 0, 0};
  
  public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
      return 0;
    }

    int row = grid.length;
    int col = grid[0].length;

    int count = 0;

    for (int i = 0; i < row; i++) {
      for (int j = 0; j < col; j++) {
        if (grid[i][j] == '1') {
          count++;
          bfs(grid, i, j);
        }
      }
    }

    return count;
  }

  public void dfs(char[][] grid, int i, int j) {
    if (grid[i][j] != '1') {
      return;
    }

    grid[i][j] = 'x';

    for (int k = 0; k < 4; k++) {
      int nx = i + dx[k];
      int ny = j + dy[k];
      if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
        dfs(grid, nx, ny);
      }
    }
  }
  
  public static void bfs(char[][] grid, int x, int y) {
    Queue<int[]> queue = new LinkedList<>();
    queue.add(new int[]{x, y});
    grid[x][y] = 'x';

    while (!queue.isEmpty()) {
      int[] curr = queue.poll();
      for (int k = 0; k < 4; k++) {
        int nx = curr[0] + dx[k];
        int ny = curr[1] + dy[k];
        if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length && grid[nx][ny] == '1') {
          queue.offer(new int[] { nx, ny });
          grid[nx][ny] = 'x';
        }
      }
    }
  }
}
```

- 플러드 필 계열의 문제
- 맵의 전역을 순회하면서 방문하지 않은 육지인 경우 경우 dfs 혹은 bfs 탐색을 수행
  - 탐색 1차례 당 연결된 섬 하나를 구하게 된다
  - 순회한 구역에 대해서는 별도의 처리를 하여 다시 방문하지 않도록 한다
