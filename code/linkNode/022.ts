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

import { ListNode } from "../../typeing";

 function detectCycle(head: ListNode | null): ListNode | null {

  let fast: ListNode = head;
  let slow: ListNode = head;
  
  if (fast === null || fast.next === null) {
      return null;
  }

  while(fast!==null && fast.next!==null) {
    fast = fast.next.next;
    slow = slow.next;

    if (fast===slow) {
      break
    }
  }

  slow = head;

  while(fast!==slow) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};