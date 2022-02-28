
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

 function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) {
        return null;
    }

    let root: TreeNode = {
        val: preorder[0],
        left: null,
        right: null
    };

    let rootIndex = inorder.indexOf(root.val);

    root.left = buildTree(preorder.slice(1, rootIndex+1), inorder.slice(0,rootIndex));
    root.right = buildTree(preorder.slice(rootIndex+1), inorder.slice(rootIndex+1))

    return root;
    
};