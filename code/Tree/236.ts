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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  
  if (root === null) return null;

  // root 等于 p、q其中一个则返回当前节点
  if (root===q || root===p) return root;

  // 左子树递归
  let left = lowestCommonAncestor(root.left, p, q);

  // 右子树递归
  let right = lowestCommonAncestor(root.right, p, q);

  // 后续遍历，只要找到在同时存在的就是最先找到的祖先节点【最近】
  if (left!==null && right!==null) return root;

  if (left===null && right===null) return null;

  return left === null ? right: left

};