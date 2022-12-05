function coinChange(coins: number[], amount: number): number {
    // dp表示对应的钱需要多少枚硬币组成, key: 钱总数， value： 需要的最小数量
    const dp: { [k:number]: number } = {};

    if (!coins.length) {
        return -1;
    }


    function getCoin(coins: number[], temp : number): number {
        if (dp[temp]) {
            return dp[temp];
        }

        if (temp===0) {
            return 0;
        }

        let result = amount + 1;
        for (let item of coins) {
            if ((temp - item) >= 0) {
                result = Math.min(getCoin(coins, temp - item)+1, result);
            }
        }

        dp[temp] = result;

        return result;
    }


    const res =  getCoin(coins, amount);

    if (res>amount) {
        return -1;
    }

    return res;

};