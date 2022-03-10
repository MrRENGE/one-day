// 动态规划解法
function foo(nums: number[]):number {
  let dp:number[] = [];
  dp.length = nums.length;
  // 至少递增子序列的长度是本身
  dp.fill(1);

  for (let i = 0 ; i<dp.length; i++) {
    for (let j = 0 ; j < i; j++) {
      if (nums[j]>nums[i]) {
        continue;
      }
      // 求最值，状态转移方程为，当前位置的最长递增子序列为，索引之前较小值的最长递增子序列+1
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  let res: number = 1;

  for (let i = 0; i<dp.length; i++) {
    res = Math.max(dp[i], res);
  }

  return res;

}