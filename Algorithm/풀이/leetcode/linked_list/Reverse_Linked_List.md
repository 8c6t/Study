Reverse Linked List
========

- 유형: 링크드 리스트
- [https://leetcode.com/problems/reverse-linked-list/](https://leetcode.com/problems/reverse-linked-list/)
- 사용 언어: Java


## 문제

Reverse a singly linked list.


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
  public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    ListNode next;

    while (curr != null) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    return prev;
  }
}
```

- 주어진 리스트 노드의 값을 역으로 가지는 리스트 노드를 반환하는 문제
- 현재 값을 가리키는 변수, 반환값을 가리키는 변수, 다음 값을 가리킬 변수를 사용
- 현재 값이 null이 나올 때까지 노드를 순회하며 현재 값의 다음 노드 값을 이전 노드로 설정해가며 역순으로 이어지는 리스트 노드를 만든다
