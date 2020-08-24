Island Perimeter
========

- 유형: Array
- [https://leetcode.com/problems/island-perimeter/](https://leetcode.com/problems/island-perimeter/)
- 사용 언어: Java


## 문제

You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.


## 풀이

```java
class Solution {
  public int islandPerimeter(int[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;
    
    int row = grid.length;
    int col = grid[0].length;
    
    int cnt = 0;
    int dup = 0;
    
    for (int i = 0; i < row; i++) {
      for (int j = 0; j < col; j++) {
        if (grid[i][j] == 1) {
          cnt++;
          
          if (j < col-1 && grid[i][j+1] == 1) dup++;
          if (i < row-1 && grid[i+1][j] == 1) dup++;
        }
      }
    }
    
    return cnt * 4 - dup * 2;
  }
}
```

- 배열을 순회하면서 전체 육지의 수와 육지끼리 인접한 수를 센다
  - 이 때 중복으로 인접 횟수를 세지 않도록 상/하, 좌/우 한 방향으로만 센다
- 전체 육지 수에 4를 곱한 뒤(둘레), 인접한 육지끼리 중복되는 둘레 값을 뺀다(2를 곱한 값)
