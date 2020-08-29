Maximum Depth of Binary Tree
========

- 유형: 트리
- [https://leetcode.com/problems/maximum-depth-of-binary-tree/](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- 사용 언어: Java


## 문제

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Note: A leaf is a node with no children.


## 풀이

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

class Solution {
  public int maxDepth(TreeNode root) {
    if (root == null) {
      return 0;
    }

    int leftMax = maxDepth(root.left);
    int rightMax = maxDepth(root.right);
    return Math.max(leftMax, rightMax) + 1;
  }
}
```

- 트리의 깊이를 구하는 문제
- 재귀로 트리의 좌우 자식 노드로 탐색을 해나간다
  - 한 단계씩 내려갈 때마다 1씩 추가
- 좌우 둘 중 가장 큰 값을 반환
