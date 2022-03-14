function superEggDrop(k: number, n: number): number {
  let cache: {[k:string]:number} = {}
  function dp(k:number, n:number):number{
    if (k===1) {
      return n;
    }

    if (n===0) {
      return 0;
    }

    if (cache[k+'#'+n]) {
      return cache[k+'#'+n];
    }

    let res = Number.MAX_SAFE_INTEGER;

    for (let i = 1; i<=n; i++) {
      res = Math.min(res, Math.max(dp(k, n-i),dp(k-1, i-1))+1 )
    }

    cache[k+'#'+n] = res;

    return res;

  }

  return dp(k,n);
};