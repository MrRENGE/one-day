// 动态规划问题
function maxSubArray(nums: number[]): number {
  let dp:number[] = [];
  dp.length = nums.length;
  dp.fill(Number.MIN_SAFE_INTEGER);
  dp[0] = nums[0]

  for (let i = 1; i<nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i-1] + nums[i]);
  }

  let res = nums[0];
  for (let i = 0; i<dp.length; i++) {
    res = Math.max(res, dp[i])
  }
  return res;
};