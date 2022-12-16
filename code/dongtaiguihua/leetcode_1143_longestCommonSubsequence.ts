function longestCommonSubsequence(text1: string, text2: string): number {
    
    // dp 数组生成，初始化默认 0 
    const dp: number[][] = Array.from(new Array(text1.length + 1), ()=> new Array(text2.length + 1).fill(0));
    for(let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            if (text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
            }
        }
    }
    return dp[text1.length][text2.length];
};