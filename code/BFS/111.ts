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

 function minDepth(root: TreeNode | null): number {
    const quene: TreeNode[] = [];
    let depth = 1;
    if (root===null) {
        return 0;
    }
    quene.push(root);

    while(quene.length>0) {
        let levelSize = quene.length;
      
        for (let i = 0; i<levelSize; i++) {
            let node = quene.shift(); // 从队列头部取走
            if (node.left === null && node.right === null) {
                return depth;
            }

            if (node.left) {
                quene.push(node.left)
            }

            if (node.right) {
                quene.push(node.right)
            }
        }
        depth++;
    }

    return depth;

};