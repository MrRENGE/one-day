function superEggDrop(k, n) {
    var cache = {};
    function dp(k, n) {
        if (k === 1) {
            return n;
        }
        if (n === 0) {
            return 0;
        }
        if (cache[k + '#' + n]) {
            return cache[k + '#' + n];
        }
        var res = Number.MAX_SAFE_INTEGER;
        for (var i = 1; i <= n; i++) {
            res = Math.min(res, Math.max(dp(k, n - i), dp(k - 1, i - 1)) + 1);
        }
        cache[k + '#' + n] = res;
        return res;
    }
    return dp(k, n);
}
;
