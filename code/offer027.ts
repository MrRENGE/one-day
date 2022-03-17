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

// 链表的后序遍历，判断是否是回文
function isPalindrome(head: ListNode | null): boolean {
  if (head===null) {
    return false;
  }

  let left = head, right = head;
  function tranver(right: ListNode | null) : boolean {
    if (right===null) {
      return true;
    }

    let res = tranver(right.next);
    left = left.next;

    return res && right.val === left.val;
  }

  return tranver(head)

};