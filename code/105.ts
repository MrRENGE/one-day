
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

// 1，找到前序遍历和中序遍历的规律， 
// 2，前序中的第一个始终是根节点，中序中 找到根节点位置，
// 3，前边的是左子树的中序遍历、 后半部分是右子树的中序遍历
// 4，前序遍历的左子树的的数目 等于中序遍历的根节点之前的数目。 
// 根据以上，可以将得到： 前序遍历 ： 左子树的前序遍历、 右子树的前序遍历
//                    中序遍历：  左子树的中序遍历、 右子树的中序遍历


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

    root.left = buildTree(preorder.slice(1, rootIndex+1), inorder.slice(0, rootIndex));
    root.right = buildTree(preorder.slice(rootIndex+1), inorder.slice(rootIndex+1))

    return root;
    
};