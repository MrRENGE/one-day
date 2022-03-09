function findAnagrams(s, p) {
    var left = 0, right = 0, valid = 0;
    var need = {}, window = {}, res = [];
    // 初始化need
    for (var i = p.length - 1; i >= 0; i--) {
        var c = p.charAt(i);
        need[c] = need[c] ? need[c] + 1 : 1;
    }
    debugger;
    while (right < s.length) {
        var newChart = s.charAt(right);
        right++;
        if (need[newChart]) {
            window[newChart] = window[newChart] ? window[newChart] + 1 : 1;
            if (window[newChart] === need[newChart]) {
                valid++;
            }
        }
        // shrink window 
        while ((right - left) >= p.length) {
            if (valid === Object.keys(need).length) {
                res.push(left);
            }
            var deleteChart = s.charAt(left);
            left++;
            if (need[deleteChart]) {
                if (window[deleteChart] === need[deleteChart]) {
                    valid--;
                }
                window[deleteChart] = window[deleteChart] - 1;
            }
        }
    }
    return res;
}
;

findAnagrams("cbaebabacd", 'abc');