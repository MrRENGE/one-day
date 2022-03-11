function longestPalindromeSubseq(s: string): number {
  let dp:number[][] = [];
  dp.length = s.length;

  for (let i = 0; i<s.length; i++) {
    let temp = [];
    temp.length = s.length;
    // dp i > j 部分是不存在回文串的，i<j 部分由状态转移方程计算可得，因此全部初始化为 0 
    temp.fill(0);
    dp[i] = temp;
    // 每个字符，回文串最小是自己本身
    dp[i][i] = 1;
  } 


  for (let i = s.length-2; i>=0; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s.charAt(i) === s.charAt(j)) {
        dp[i][j] = dp[i-1][j-1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1])
      }
    }
  }

  return dp[0][s.length-1];
};