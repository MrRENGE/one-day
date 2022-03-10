// 动态规划三部曲

// 找到 dp 定义， 找到状态转移方程（从子问题的解，得到大问题的解）

/*
  dp[i][j] = text1[i] === text2[j] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
  dp 最后一个位置就是
*/

function longestCommonSubsequence(text1: string, text2: string): number {
  let len1 = text1.length, len2 = text2.length;

  let dp:Array<number[]> = [];
  dp.length = len1 + 1;

  // 注意，初始化dp要避免同一个引用
  for(let i = 0; i < dp.length; i++) {
    let temp = [];
    temp.length = len2+1;
    temp.fill(0)
    dp[i] = temp;
  }

  dp[0][0] = 0;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j<=len2; j++) {
      if (text1.charAt(i-1) === text2.charAt(j-1)) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }

  return dp[len1][len2];

};