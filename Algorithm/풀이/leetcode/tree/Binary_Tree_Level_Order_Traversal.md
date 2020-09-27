Binary Tree Level Order Traversal
========

- 유형: 이진 트리
- [https://leetcode.com/problems/binary-tree-level-order-traversal/](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- 사용 언어: Java


## 문제

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],

```
    3
   / \
  9  20
    /  \
   15   7
```

return its level order traversal as:

```
[
  [3],
  [9,20],
  [15,7]
]
```

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
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) {
      return result;
    }

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
      int size= queue.size();
      List<Integer> arr = new ArrayList<>();
      
      for (int i = 0; i < size; i++) {
        TreeNode curr = queue.poll();

        arr.add(curr.val);

        TreeNode left = curr.left;
        TreeNode right = curr.right;

        if (left != null)   queue.offer(left);
        if (right != null)  queue.offer(right);
      }
      
      result.add(arr);
    }

    return result;
  }
}
```

- 주어진 이진 트리를 레벨 순회 한 결과를 반환하는 문제
  - 한 레벨의 모든 노드를 방문한 뒤 다음 레벨을 방문
- 큐를 이용하여 각 레벨 단위로 탐색
- 사이즈만큼만 큐에서 빼는 작업을 하여 각 레벨 단위로 순회를 하도록 조정
- 현재 값을 리스트에 담고, 자식 노드를 큐에 넣는다
- 해당 레벨의 순회가 끝나면 리스트를 결과에 담는다
