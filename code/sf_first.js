let listNodes = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null
    }
  }
};



// for (let p = listNodes; p!==null; p = p.next) {
//   console.log(p.value);
// }

function traverList(listNodes) {
  if (listNodes) {
    console.log(listNodes.value, "pre"); //前序遍历
    traverList(listNodes.next);
    console.log(listNodes.value, "after"); // 后续遍历
  }
}

traverList(listNodes);


let  TreeNode = {
  value: 1,
  left: null,
  right: null,
}


function  CreateOneNode (value, left, right) {
  let node = JSON.parse(JSON.stringify(TreeNode));
  node.value = value;
  node.left = left || null;
  node.right = right || null;
}

function generateTwoForkTree(count) {
  let head, left, right, temp;


  for (let i = 0; i<count; i++) {
    if (i === 1) {
      head = CreateOneNode(i);
    } else {
      if (i%2 === 1) {
        let node = CreateOneNode(i);
        left = node;
        head.left = left
      } else {
        let node = CreateOneNode(i);
        right = node;
        head.right = right;
      }
    }
  }
}
