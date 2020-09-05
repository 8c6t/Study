Word Search
========

- 유형: 그래프
- [https://leetcode.com/problems/word-search/](https://leetcode.com/problems/word-search/)
- 사용 언어: Java


## 문제

Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.


## 풀이

```java
class Solution {
  int[] dx = {-1, 1, 0, 0};
  int[] dy = {0, 0, -1, 1};
  int row;
  int col;

  public boolean exist(char[][] board, String word) {
    if (board == null || board.length == 0 || board[0].length == 0) {
      return false;
    }

    row = board.length;
    col = board[0].length;

    boolean[][] check = new boolean[row][col];

    for (int i = 0; i < row; i++) {
      for (int j = 0; j < col; j++) {
        if (dfs(board, check, i, j, 0, word)) {
          return true;
        }
      }
    }
    return false;
  }

  public boolean dfs(char[][] board, boolean[][] check, int x, int y, int start, String word) {
    if (start == word.length()) {
      return true;
    }

    if (x < 0 || x >= row || y < 0 || y >= col || check[x][y]) {
      return false;
    }

    if (board[x][y] != word.charAt(start)) {
      return false;
    }

    check[x][y] = true;
    for (int k = 0; k < 4; k++) {
      int nx = x + dx[k];
      int ny = y + dy[k];

      if (dfs(board, check, nx, ny, start + 1, word)) {
        return true;
      }
    }
    check[x][y] = false;

    return false;
  }
}
```

- 주어진 배열에서 해당 문자열을 만들 수 있는지 여부를 반환하는 문제
- DFS로 탐색하면서 현 좌표의 값이 현재 문자열 인덱스의 값과 같은지 확인하는 방법으로 진행
