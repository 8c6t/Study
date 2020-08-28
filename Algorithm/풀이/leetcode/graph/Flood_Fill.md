Flood Fill
========

- 유형: 그래프
- [https://leetcode.com/problems/flood-fill/](https://leetcode.com/problems/flood-fill/)
- 사용 언어: Java


## 문제

An image is represented by a 2-D array of integers, each integer representing the pixel value of the image (from 0 to 65535).

Given a coordinate (sr, sc) representing the starting pixel (row and column) of the flood fill, and a pixel value newColor, "flood fill" the image.

To perform a "flood fill", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.

At the end, return the modified image.


## 풀이

```java
class Solution {
    
  static int[][] dirs = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};
  
  public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {    
    int color = image[sr][sc];
    if (color == newColor) return image;
    dfs(image, sr, sc, color, newColor);
    return image;
  }
  
  
  public void dfs(int[][] image, int x, int y, int color, int newColor) {
    if (x < 0 || x >= image.length || y < 0 || y >= image[0].length || image[x][y] != color) return;
    
    image[x][y] = newColor;
    
    for (int[] dir :dirs) {
      dfs(image, x + dir[0], y + dir[1], color, newColor);
    }
  }
}
```

- 플러드 필 계열의 문제
- 주어진 좌표(sr, sc) 부터 dfs 혹은 bfs 탐색을 시작하여 같은 색인 경우 색을 변경한다
