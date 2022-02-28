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

// 自顶向下
function maxDepth(root: TreeNode | null): number {
  let ans: number = 0;

  function dep(node, depth) {
    if (node === null) return;
    if (node.left === null && node.right === null) {
      ans = Math.max(ans, depth);
    }

    if (node.left) {
      dep(node.left, depth + 1)
    };
    if (node.right) dep(node.right, depth + 1);
  }
  dep(root, 1);
  return ans;
};

// 自底向上
function maxDepth1 (root: TreeNode | null): number{
  function dep(node: TreeNode | null): number {
    if (node===null) return 0;
    let leftMaxDepth = maxDepth1(node.left);
    let rightMaxDepth = maxDepth1(node.right);

    return Math.max(leftMaxDepth, rightMaxDepth) +1;
  }
  return dep(root);
}