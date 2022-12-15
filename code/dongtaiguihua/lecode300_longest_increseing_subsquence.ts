function lengthOfLIS(nums: number[]): number {
    let result = 1;
    // dp 定义： dp 中每个每个值表示 nums 对应值的最长递增子序列的长度。
    const dp: number[] = [];
    dp.length = nums.length;
    dp[0] = 1;

    // 状态转移方程定义，当前元素在末尾的最长递增子序列的长度，等于该元素之前的元素中比当前元素小的元素集合中最长的递增子序列长度+1.
    for (let i = 0; i < nums.length; i++) {
        
        // 遍历nums[i]元素之前的所有元素
        for (let j = i; j>=0; j--) {
            // 寻找比起小的元素进行对比
            if (nums[i]>nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            // 存在相同值大小的元素，取其中最大的递增子序列作为当前值
            if (nums[i]===nums[j]) {
                dp[i] = Math.max(dp[i], dp[j]);
            }
            result = Math.max(result, dp[i]);
        }
    }

    return result;
};