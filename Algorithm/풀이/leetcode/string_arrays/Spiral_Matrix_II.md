Spiral Matrix II
========

- 유형: 배열
- [https://leetcode.com/problems/spiral-matrix-ii/](https://leetcode.com/problems/spiral-matrix-ii/)
- 사용 언어: Java


## 문제

Given a positive integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.


## 풀이

```java
class Solution {
  public int[][] generateMatrix(int n) {
    int[][] result = new int[n][n];
    int rowStart = 0;
    int rowEnd = n - 1;
    
    int colStart = 0;
    int colEnd = n - 1;
    
    int cnt = 1;
    
    while (rowStart <= rowEnd && colStart <= colEnd) {
      // right
      for (int i = colStart; i <= colEnd; i++) {
        result[rowStart][i] = cnt++;
      }
      rowStart++;
      
      // down
      for (int i = rowStart; i <= rowEnd; i++) {
        result[i][colEnd] = cnt++;
      }
      colEnd--;
      
      // left
      if (rowStart <= rowEnd) {
        for (int i = colEnd; i >= colStart; i--) {
          result[rowEnd][i] = cnt++;
        }
        rowEnd--;
      }    
      
      // up
      if (colStart <= colEnd) {
        for (int i = rowEnd; i >= rowStart; i--) {
          result[i][colStart] = cnt++;
        }
        colStart++;
      }
    }

    return result;
  }
}
```

- 주어진 수를 크기로 하는 2차원 배열에 나선 모양으로 수를 채워 반환하는 문제
- 우, 하, 좌, 상 순서로 수를 채워나간다
- 각 단계를 진행하면서 행렬의 시작값과 끝값을 증감한다
- 좌, 상 진행 시 시작값이 끝값보다 작은지 확인이 필요
