
// 思路： 回溯处理，单次回溯的出口则是找到 k 个，深度达到叶子节点。
function combine(n: number, k: number): number[][] {
  let res:number[][] = [];
  
  function backtrack(track:number[], flag: number, n: number, k:number ) {
    // 达到叶子节点了
    if (track.length===k) {
      res.push([...track]);
      return ;
    }

    // 越往下，选择的节点越少，之前选过的不能再用，需要用flag来控制选择的节点位置在 flag - n 之间
    for (let i = flag; i<=n; i++) {
      // 做选择
      track.push(i);
      // 进入下一个决策树
      backtrack([...track], i+1, n, k);
      // 撤销选择
      track.pop();
    }
    
  }

  backtrack([], 1, n, k);

  return res;
};