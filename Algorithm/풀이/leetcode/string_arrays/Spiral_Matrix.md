Spiral Matrix
========

- 유형: 배열
- [https://leetcode.com/problems/spiral-matrix/](https://leetcode.com/problems/spiral-matrix/)
- 사용 언어: Java


## 문제

Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.


## 풀이

```java
class Solution {
  public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();

    if (matrix == null || matrix.length == 0) {
      return result;
    }
    
    int rowStart = 0,
        colStart = 0,
        rowEnd   = matrix.length - 1,
        colEnd   = matrix[0].length - 1;

    while (rowStart <= rowEnd && colStart <= colEnd) {
      // right
      for (int i = colStart; i <= colEnd; i++) {
        result.add(matrix[rowStart][i]);
      }
      rowStart++;

      // down
      for (int i = rowStart; i <= rowEnd; i++) {
        result.add(matrix[i][colEnd]);
      }
      colEnd--;

      // left
      if (rowStart <= rowEnd) {
        for (int i = colEnd; i >= colStart; i--) {
          result.add(matrix[rowEnd][i]);
        }
        rowEnd--;
      }

      // up
      if (colStart <= colEnd) {
        for (int i = rowEnd; i >= rowStart; i--) {
          result.add(matrix[i][colStart]);
        }
        colStart++;
      }
    }
    
    return result;
  }
}
```

- 2차원 배열을 나선 모양으로 순회하며 그 값을 반환하는 문제
- 우, 하, 좌, 상 순서로 2차원 배열을 순회한다
- 각 단계를 진행하면서 행렬의 시작값과 끝값을 증감한다
- 좌, 상 진행 시 시작값이 끝값보다 작은지 확인이 필요
