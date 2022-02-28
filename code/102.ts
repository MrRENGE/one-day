
function levelOrder(root: TreeNode | null): number[][] {
  let result = [];
  let quen = [];

  if (root === null) return [];

  quen.push(root);

  while (quen.length) {
    let levelSize = quen.length; // 用于记录当前层次存在几个节点
    let level = []; // 用于存储，当前层，所有节点的 val值

    for (let i = 0; i < levelSize; i++) {
      let node = quen.shift(); // 从队列中取出节点

      level.push(node.val); // 把节点的值压入 level 中

      // 如果当前节点存在左右子节点存在，那么分别加入队列，注意顺序，一定是先左后右。反之则是层次的倒序。
      if (node.left) {
        quen.push(node.left);
      }

      if (node.right) {
        quen.push(node.right)
      }
    }

    result.push(level);
  }
  return result;

};