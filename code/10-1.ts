function fib(n: number): number {
  let cache:Map<number,number> = new Map();
  function dp(n): number {
      if (n === 0) return 0;
      if (n === 1) return 1;
      if (cache.get(n)) return cache.get(n);
      
      cache.set(n, dp(n-1) + dp(n-2));

      return cache.get(n);
  }
  return dp(n);
};

