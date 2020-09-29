Merge k Sorted Lists
========

- 유형: 링크드 리스트
- [https://leetcode.com/problems/merge-k-sorted-lists/](https://leetcode.com/problems/merge-k-sorted-lists/)
- 사용 언어: Java


## 문제

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.


## 풀이

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
  public ListNode mergeKLists(ListNode[] lists) {
    Queue<Integer> queue = new PriorityQueue<>((a, b) -> a - b);
    ListNode result = new ListNode(0);
    ListNode point = result;

    for (ListNode node : lists) {
      while (node != null) {
        queue.offer(node.val);
        node = node.next;
      }
    }

    while (!queue.isEmpty()) {
      point.next = new ListNode(queue.poll());
      point = point.next;
    }

    return result.next;
  }
}
```

- 주어진 리스트를 하나의 정렬된 리스트로 반환하는 문제
- 우선순위 큐에 모든 노드의 값을 넣은 뒤, 하나씩 빼면서 리스트를 완성시켜나간다

