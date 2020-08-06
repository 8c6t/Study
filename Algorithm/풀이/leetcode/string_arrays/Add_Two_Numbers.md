Add Two Numbers
========

- 유형: LinkedList
- [https://leetcode.com/problems/add-two-numbers/](https://leetcode.com/problems/add-two-numbers/)
- 사용 언어: Java


## 문제

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.


## 풀이

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode result = new ListNode(0);
    
    ListNode a = l1;
    ListNode b = l2;
    ListNode c = result;
    
    int sum = 0;
    
    while(a != null || b != null) {
      if (a != null) {
        sum += a.val;
        a = a.next;
      }
      
      if (b!= null) {
        sum += b.val;
        b = b.next;
      }
      
      c.next = new ListNode(sum % 10);
      c = c.next;
      sum /= 10;
    }
    
    if (sum == 1) {
      c.next = new ListNode(1);
    }
    
    return result.next;
  }
}
```

- 주어진 리스트 노드, 답, 그 다음 리스트 노드를 저장할 변수들의 레퍼런스 할당에 유의
- l1, l2 리스트 노드를 순회하면서 각 노드의 값을 더한 뒤, 그 값으로 새로운 리스트 노드를 생성하여 값에 저장
  - 1의 자리만 세므로 모듈러 연산
  - 두 값의 합이 10을 넘긴다면 다음 자리에 1을 더해야 하므로, 나눗셈 연산으로 판별
