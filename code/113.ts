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


function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  let result = [];

  if (root === null) return [];

  function dep(node: TreeNode | null, his: number[]) {
    if (node === null) return;

    let temp = Array.from(his);
    temp.push(node.val);
    //    his.push(node.val);

    let total: number = temp.reduce((ac, cu) => ac + cu, 0);

    // if (total*total>targetSum*targetSum) return ;

    if (node.left === null && node.right === null) {
      if (total === targetSum) {
        result.push(temp);
      }
      return;
    }

    if (node.left) dep(node.left, temp);

    if (node.right) dep(node.right, temp);
  }

  dep(root, []);

  return result;
};