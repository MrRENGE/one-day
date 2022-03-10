var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function longestCommonSubsequence(text1, text2) {
    var len1 = text1.length, len2 = text2.length;
    var dp = [];
    dp.length = len1 + 1;
    var temp = [];
    temp.length = len2 + 1;
    temp.fill(0);
    debugger;
    dp.fill([...temp]);

    for (var i = 1; i <= len1; i++) {
        for (var j = 1; j <= len2; j++) {
            if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[len1][len2];
}
;
