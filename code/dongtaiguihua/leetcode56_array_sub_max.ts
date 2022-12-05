function maxSubArray(nums: number[]): number {
    let result = nums[0];
    // dp中定义，index 表示 nums 中的index位置， value 表示其作为最后一个元素时，构成的子数组最大和。
    const dp: number[] = [];
    dp[0] = result;

    for (let i = 1; i < nums.length; i++) {
        if (dp[i-1]>=0) {
            dp[i] = dp[i-1] + nums[i];
        } else {
            dp[i] = nums[i]; 
        }

        result =  Math.max(result,dp[i]);
    }
    return result;
};

// 状态压缩
function maxSubArray(nums: number[]): number {
    let result = nums[0];
    // dp中定义，index 表示 nums 中的index位置， value 表示其作为最后一个元素时，构成的子数组最大和。
    let pre = result, curent;

    for (let i = 1; i < nums.length; i++) {
        if (pre>=0) {
            curent = pre + nums[i];
            
        } else {
            curent = nums[i]; 
        }
        pre = curent
        result =  Math.max(result,curent);
    }
    return result;
};