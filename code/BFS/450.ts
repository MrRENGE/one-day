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

    // 如果只存在一边
    // 左子树有内容则返回左子树
    // 右子树有内容则返回右子树
    if (root.left===null) return root.right;
    if (root.right===null) return root.left;

    // 两边都存在则，需要找到比左子树大，比 根节点小的一个值作为根节点。 遍历右子树中的最小值【最左边】
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