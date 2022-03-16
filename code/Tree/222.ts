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

function countNodes(root: TreeNode | null): number {
  if (root===null) {
    return 0;
  }

  let lh = 0, rh = 0;

  let left = root.left;
  let right = root.right;

  while(left!==null) {
    left = left.left;
    lh++;
  }

  while(right !== null) {
    right = right.right;
    rh++;
  }

  if (lh === rh) {
    return Math.pow(2, lh) - 1;
  }

  return 1 + countNodes(root.left) + countNodes(root.right);

};