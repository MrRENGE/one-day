function subsets(nums: number[]): number[][] {
  let res:number[][] = [];

  function backtrack(track: number[], flag: number, options: number[]) {
    // 满足条件保存
    res.push([...track]);

    for (let i = flag; i<nums.length; i++) {
      // 做选择
      track.push(nums[i]);

      // 递归,进入下一决策
      backtrack([...track], i+1, nums);

      // 撤销选择
      track.pop();
      
    }

  }

  backtrack([], 0, nums);

  return res;
  
};