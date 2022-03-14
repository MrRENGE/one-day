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

 function isValidBST(root: TreeNode | null): boolean {
  function dp(root: TreeNode | null, min: TreeNode | null, max: TreeNode | null ): boolean{
    if (root === null) return true;
    
    if ((min !== null) && root.val <= min.val) return false;
    if ((max !== null) && root.val>= max.val) return false;

    return dp(root.left, min, root) && dp(root.right, root, max);
  }
  return dp(root, null, null);
};
