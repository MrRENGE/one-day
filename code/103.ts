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


// 锯齿形遍历，S 型 。 层次遍历 + 控制存入的方向即可。

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  let result = [];
  if (root === null) return result;
  let quen: TreeNode[] = [];
  quen.push(root);
  let direct = 1;

  while (quen.length) {
    let levelSize = quen.length;
    let level = [];

    for (let i = 0; i < levelSize; i++) {
      let node = quen.shift();

      if (node.left) quen.push(node.left);
      if (node.right) quen.push(node.right);

      if (direct % 2) {
        level.push(node.val);
      } else {
        level.unshift(node.val)
      }

    }

    direct += 1;
    result.push(level);

  }

  return result;
};