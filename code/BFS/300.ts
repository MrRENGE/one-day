

function lengthOfLIS(nums: number[]): number {
  let dp: number[] = []; // dp 数组表示每个位置，当前最大序列长度

  dp.length = nums.length; // 初始化和 nums 同
  dp.fill(1); // 至少含有当前节点，至少是 1

  for (let i =0; i<nums.length; i++) {

    for (let j=0; j<i; j++) {
      if (nums[i]>nums[j]) {
        dp[i] = Math.max(dp[i], dp[j]+1);
      }
    }

  }

  let res: number = 0;

  for (let i = 0; i<dp.length; i++) {
    res = Math.max(res, dp[i]);
  }

  return res;
};