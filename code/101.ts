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

// 检测二叉树是否对称，则是检测当前节点的左右子树是否镜像对称
// 要检测两棵树是否镜像对称，需要检测 左子树 和右子树是否 对称
function isSymmetric(root: TreeNode | null): boolean {
  function check(left: TreeNode, right: TreeNode): boolean {
    // 注意顺序，如果两个都是 null， 则相等，第二个判断不会执行，
    if (left === null && right === null) return true;
    // 至少存在一个非空
    if (left === null || right === null) return false;

    return left.val === right.val && check(left.left, right.right) && check(left.right, right.left);
  }
  return check(root.left, root.right);
};