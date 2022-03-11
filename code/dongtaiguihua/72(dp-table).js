function minDistance(word1, word2) {
    var dp = [];
    dp.length = word1.length + 1;
    debugger;
    for (var i = 0; i <= word1.length; i++) {
        var temp = [];
        temp.length = word2.length + 1;
        dp[i] = temp;
    }
    dp[0][0] = 0;
    for (var i = 1; i <= word1.length; i++) {
        dp[i][0] = i;
    }
    for (var j = 1; j <= word2.length; j++) {
        dp[0][j] = j;
    }
    for (var i = 1; i <= word1.length; i++) {
        for (var j = 1; j <= word2.length; j++) {
            if (word1.charAt(i-1) === word2.charAt(j-1)) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = Math.min(dp[i - 1][j], // 插入
                dp[i - 1][j - 1], // 替换
                dp[i][j - 1]) + 1;
            }
        }
    }
    return dp[word1.length][word2.length];
}
;
