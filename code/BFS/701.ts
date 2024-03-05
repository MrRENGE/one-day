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

 function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {

  function dp(root: TreeNode | null, val: number): TreeNode {
    if (root === null) {
      return { val, left: null, right: null };
    }

    if (root.val === val) {
      return root;
    }

    if (root.val < val) {
      root.right = dp(root.right, val);
    }

    if (root.val > val) {
      root.left = dp(root.left, val)
    }

  }

 if (root === null) {
   return { val, left: null, right: null } as TreeNode;
 }

  dp(root, val);

  return root;
};
