// 自顶向下
function climbStairs(n: number): number {
    const dp: number[] = [];
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 2;

    function dpFunc(n:number): number {
        if (dp[n]) {
            return dp[n];
        }
        if (n<=1) {
            return 1
        }
        if (n===2) {
            return 2;
        }

        const res = dpFunc(n-1) + dpFunc(n-2);
        dp[n] = res;
        return res;
    }

    return dpFunc(n);
};

// 自底向上
function climbStairs(n: number): number {
    const dp: number[] = [];
    dp[0] = 1;
    dp[1] = 1;

    for(let i =2; i<=n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
};

