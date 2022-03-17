/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (left===1) {
    return reversN(head, right);
  }

  head.next = reverseBetween(head.next, left-1, right-1);
  return head;

};


// 链表反转前N个节点
let successor = null; // 后继节点
function reversN(head: ListNode | null, n: number) : ListNode | null{
  if (n===1) {
    successor = head.next;
    return head;
  }

  let last = reversN(head.next, n-1);

  head.next.next = head;
  head.next = successor;

  return last;

}


// 反转整个链表，采用后序遍历方式，递归的将后继节点的next 变成当前节点，当前节点的next 设置为 null。
function reverse(head: ListNode | nul):ListNode | nul {
  if (head === null || head.next === null) return head;
  let last = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
} 