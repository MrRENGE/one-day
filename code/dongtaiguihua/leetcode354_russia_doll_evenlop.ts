function maxEnvelopes(envelopes: number[][]): number {
    /* 思路：信封嵌套问题，转化成最长递增子序列问题。
        先按照宽度递增排序，如果宽度相同的则按照长度递减排序。然后针对高度进行计算最长递增子序列。
        envelopes[[w,h], [w,h],[w,h]] => 按照 w 进行递增排序， 如果 w 相同则按照h从大到小排序。最后针对h列进行最长递增子序列计算即可。
    */

    const h = sortEnvelopes(envelopes);

    return calculateLongestIncreasingSubsequence(h);
};

// 排序后只返回 h 列数组
function sortEnvelopes(data: number[][]): number[]{
    data.sort((item1, item2)=>{
        const re = item1[0] - item2[0];
        if (re===0) {
            return item2[1] - item1[1];
        }
        return re;
    })

    return data.map(([, h])=>h);
}

function calculateLongestIncreasingSubsequence(data: number[]): number {
    let result = 1;

    // 定义dp： 表示每个data中下标对应的最长递增子序列长度
    const dp: number[] = [];
    dp.length = data.length;
    dp.fill(1);

    for (let i = 0; i<data.length; i++) {
        for (let j = i; j>=0; j--) {
            if (data[j]<data[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            if (data[i] === data[j]) {
                dp[i] = Math.max(dp[i], dp[j]);
            }
            result = Math.max(result, dp[i]);
        }
    }

    return result;
}