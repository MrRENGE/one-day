function coinChange(coins: number[], amount: number): number {
  const memo: Map<number, number> = new Map();
  function dep(n): number {
    if (memo.get(n)) {
      return memo.get(n);
    }

    if (n === 0) return 0;
    if (n < 0) return -1;

    let result = n + 1;

    for (let i = 0; i < coins.length; i++) {
      let sub = dep(n - coins[i]);
      if (sub === -1) {
        continue;
      }
      result = Math.min(result, sub + 1);
    }

    if (result === n + 1) {
      result = -1
    }
    memo.set(n, result);

    return result;
  }

  return dep(amount);

};