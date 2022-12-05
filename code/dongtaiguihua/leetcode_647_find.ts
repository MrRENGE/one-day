function findLengthOfLCIS(nums: number[]): number {
    // const dp: number[] = [];
    // dp[0] = 1;
    let pre = 1, curent;
    let result = 1;

    for(let i = 1; i<nums.length; i++) {
        if (nums[i-1]<nums[i]) {
            curent = pre + 1;
        } else {
            curent = 1;
        }
        pre = curent;
        result = Math.max(result,curent);
    }
    return result;
};