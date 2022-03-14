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

 function deleteNode(root: TreeNode | null, key: number): TreeNode | null {

  function getMinNode(node: TreeNode) : TreeNode {

    while (node.left !== null) {
      node = node.left
    }

    return node;
  } 

  if (root === null) {
    return null;
  }

  if (root.val === key) {
    // 将右子树最小的和 root 进行交换，然后删除最后一个节点

    let node = getMinNode(root.right);

    root.val = node.val;

    root.right = deleteNode(root.right, node.val);

  }

  if (root.val < key) {
    root.right = deleteNode(root.right, key);
  }

  if (root.val > key) {
    root.left = deleteNode(root.left, key);
  }

  return root;
};