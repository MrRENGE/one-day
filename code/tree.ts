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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  
  if (root === null) {
    return false
  }

  function dep(node: TreeNode | null, total): boolean{
    if (node===null) {
      return total === targetSum;
    }

    if (node.left === null && node.right===null ) {
      return node.val+total === targetSum;
    }

    if (node.left===null &&node.right) {
      return dep(node.right, node.val+total);
    }

    if (node.left && node.right===null) {
      return dep(node.left, node.val+total);
    }

    return dep(node.left, total+node.val) || dep(node.right, node.val+total);
  }

  return dep(root, 0);

};