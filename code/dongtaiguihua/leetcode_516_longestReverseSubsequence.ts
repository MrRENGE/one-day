function longestPalindromeSubseq(s: string): number {
    const dp: number[][] = Array.from(new Array(s.length), ()=>{
        const arr = new Array(s.length); 
        arr.fill(0); 
        return arr;
    });
    for (let i = 0; i < s.length; i++) {
        dp[i][i] = 1;
    }

    for (let i = s.length-2; i >= 0; i--) {
        for (let j = i+1; j < s.length; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }

    return dp[0][s.length-1];
};