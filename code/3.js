// 最长无重复字串长度
function lengthOfLongestSubstring(s) {
    var window = {};
    var left = 0, right = 0;
    var res = 0;
    while (right < s.length) {
        var newChart = s.charAt(right);
        right++;
        window[newChart] = window[newChart] ? window[newChart] + 1 : 1;
        // 出现重复字符，就开始收缩窗口
        while (window[newChart] > 1) {
            var deleteChart = s.charAt(left);
            left++;
            window[deleteChart] = window[newChart] - 1;
        }
        res = Math.max(res, right - left);
    }
    return res;
}
;
