function maxSlidingWindow(nums, k) {
    var window = [];
    var res = [];
    function add(data) {
        while (window.length && window[window.length - 1] < data) {
            window.pop();
        }
        window.push(data);
    }
    function move(data) {
        if (data === window[0]) {
            window.shift();
        }
    }
    for (var i = 0; i < nums.length; i++) {
        if (i < k - 1) {
            add(nums[i]);
        }
        else {
            // 加进去
            add(nums[i]);
            // 取最大值
            res.push(window[0]);
            // 移动窗口
            move(nums[i]);
        }
    }
    return res;
}
;
