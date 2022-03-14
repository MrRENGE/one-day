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

 function kthSmallest(root: TreeNode | null, k: number): number {

  let res: number ;

  function dp (root: TreeNode | null){
    if (root===null) return;

    dp(root.left);
    // res.push(root.val);
    k--;
    if (k===0) {
      res = root.val;
      return 
    }
    dp(root.right);

  }

  dp(root);
  return res;
};