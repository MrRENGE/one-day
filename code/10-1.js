function fib(n) {
    var cache = new Map();
    function dp(n) {
        if (cache.get(n)) return cache.get(n);
        if (n === 0 ) return 0;
        if (n === 1 || n === 2 ) return 1;
        
        cache.set(n, dp(n - 1) + dp(n - 2));
        return cache.get(n);
    }
    return dp(n);
}
