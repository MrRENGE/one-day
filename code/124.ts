/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// class TreeNode {
//   val: number
//   left: TreeNode | null
//   right: TreeNode | null
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = (val === undefined ? 0 : val)
//     this.left = (left === undefined ? null : left)
//     this.right = (right === undefined ? null : right)
//   }

// }

type TreeNode  = {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}


function maxPathSum(root: TreeNode | null): number {
  let result = Number.MIN_SAFE_INTEGER;

  function oneSideMax(root: TreeNode | null) {
    if (root === null) {
      return 0
    }
    let left: number  = Math.max(0, oneSideMax(root.left));
    let right: number = Math.max(0, oneSideMax(root.right));
  
    result = Math.max(result, left + right + root.val);
  
    return Math.max(left, right) + root.val;
  }

  oneSideMax(root);

  return result;

};

/* 解题思路:
  寻找二叉树中最大的路径和，那就是寻找到左边最大、右边最大，再加上当前节点的值。


*/

