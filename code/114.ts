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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {

  let result = [];
  function dep(node: TreeNode | null) {
    if (node === null) return
    result.push(node);
    node.left && dep(node.left);
    node.right && dep(node.right);
  }


  if (root !== null) {
    dep(root);
    result.length && result.reduce((head, cu) => {

      head.left = null;
      head.right = cu;
      return head.right;
    }, {});
  }

};