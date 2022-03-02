


// 回溯的思想：
// 做选择
// 递归进入下一层决策树
// 撤销选择

function permute(nums: number[]): number[][] {
  let res:number[][] = [];
  let track: number[] = [];

  function dep(nums: number[], track: number[]) {

    // 出口，如果已经排列完成 退出
    if (nums.length === track.length) {
      res.push([...track]);
      return;
    }

    // 对待排列的进行循环
    for (let i = 0; i<nums.length; i++) {
      // 如果已经选过了，跳过
      if (track.includes(nums[i])) {
        continue;
      }

      // 选择当前节点  做选择
      track.push(nums[i]);

      // 进入下一决策树
      dep(nums, track);

      // 撤销 选择
      track.pop()
    }
  }
  dep(nums, track);
  return res;
};


