function minDistance(word1: string, word2: string): number {

  let cache: { [k: string]: number } = {};
  // 缓存避免重复计算

  function dp(i: number, j: number): number {
    // i 结束了，j 还没走完，那么需要插入的数量为 j+1 （+1是因为从0开始算的）
    // 插入
    if (i === -1) {
      return j + 1
    }

    // 删除
    if (j === -1) {
      return i + 1;
    }

    if (cache[j + '#' + i]) {
      return cache[j + '#' + i];
    }

    if (word1.charAt(i) === word2.charAt(j)) {
      // 相等则跳过
      return cache[j + '#' + i] = dp(i - 1, j - 1);
    } else {
      return cache[j + '#' + i] = Math.min(
        dp(i - 1, j) + 1, // 插入
        dp(i - 1, j - 1) + 1, // 替换
        dp(i, j - 1) + 1  // 删除
      )
    }

  }

  return dp(word1.length - 1, word2.length - 1);
};