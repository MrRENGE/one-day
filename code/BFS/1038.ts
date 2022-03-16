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

 function bstToGst(root: TreeNode | null): TreeNode | null {
  let count = 0;
  function dp(root: TreeNode | null) {
    if (root === null) return;
    dp(root.right);

    count = count + root.val;
    root.val = count;

    dp(root.left);
    
  }

  dp(root);

  return root;
};