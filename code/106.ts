import { TreeNode } from "../typeing";

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
 function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  if (postorder.length===0) return null;
  
  let root:TreeNode = {
    val: postorder[postorder.length-1],
    left: null,
    right: null,
  };

  let rootIndex = inorder.indexOf(root.val);

  root.left = buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex));
  root.right = buildTree(inorder.slice(rootIndex+1), postorder.slice(rootIndex, (postorder.length-1)));


  return root;
  
};