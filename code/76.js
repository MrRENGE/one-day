function minWindow(s, t) {
    var need = {};
    var window = {};
    // 窗口的左右位置
    var left = 0, right = 0;
    //  start 记录最小串的起点索引， len 记录长度
    var start = 0, len = Number.MAX_SAFE_INTEGER;
    // 用于记录是否找全
    var valid = 0;
    // 初始化 need
    for (var i = t.length - 1; i >= 0; i--) {
        need[t.charAt(i)] = 1;
    }

    debugger;
    while (right < s.length) {
        var rightChart = s.charAt(right);
        right++;
        // 需要存的才加入窗口否则继续华东
        if (need[rightChart]) {
            window[rightChart] = window[rightChart] ? window[rightChart] + 1 : 1;
            //  如果当前的字符是目标字符中的一个，并且是第一次加入窗口则 valid ++ 
            if (window[rightChart] === need[rightChart]) {
                valid++;
            }
        }
        while (valid === t.length) {
            // 取最值
            if ((right - left) < len) {
                start = left;
                len = right - left;
            }
            var deleteChart = s[left];
            left++;
            if (need[deleteChart]) {
                // 如果窗口中的字符是目标字符，仅有一个时去掉需要同步减少一个 valid
                if (window[deleteChart] === need[deleteChart]) {
                    valid--;
                }
                window[deleteChart] = window[deleteChart] ? window[deleteChart] - 1 : 0;
            }
        }
    }
    
    return len === -1 ? '' : s.substring(start, start+len);
}
;

console.log(minWindow("ADOBECODEBANC", 'ABC'));