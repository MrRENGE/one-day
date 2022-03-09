function checkInclusion(s1, s2) {
    var need = {};
    var window = {};
    var left = 0, right = 0;
    var valid = 0;
    for (var i = s1.length - 1; i >= 0; i--) {
        need[s1.charAt(i)] = need[s1.charAt(i)] ? need[s1.charAt(i)] + 1 : 1;
    }
    debugger
    while (right < s2.length) {
        var newChart = s2.charAt(right);
        right++;
        if (need[newChart]) {
            window[newChart] = window[newChart] ? window[newChart] + 1 : 1;
            if (need[newChart] === window[newChart]) {
                valid++;
            }
        }
        // 收缩窗口
        while ((right - left) >= s1.length) {
            // 找到则退出
            if (valid === Object.keys(need).length) {
                return true;
            }
            var deleteChart = s2.charAt(left);
            left++;
            if (need[deleteChart]) {
                if (window[deleteChart] === need[deleteChart]) {
                    valid--;
                }
                window[deleteChart] = window[deleteChart] ? window[deleteChart] - 1 : 0;
            }
        }
    }
    return false;
}
;

console.log(checkInclusion("eidbaooo", 'ab'))
