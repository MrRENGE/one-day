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

 function levelOrderBottom(root: TreeNode | null): number[][] {
  let result = [];
  let quen = [];
  if (root === null) {
      return [];
  }
  quen.push(root);

  while(quen.length) {
      let levelSize = quen.length;
      let level = [];
      for (let i = 0; i<levelSize; i++) {
          let node = quen.shift();
          level.push(node.val);
          if (node.left) quen.push(node.left);
          if (node.right) quen.push(node.right);
      }
      result.unshift(level);
  }

  return result;

};