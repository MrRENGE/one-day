function permute(nums) {
    var res = [];
    var track = [];
    function dep(nums, track) {
        if (nums.length === track.length) {
            res.push([...track]);
            return;
        }
        for (var i = 0; i < nums.length; i++) {
            if (track.includes(nums[i])) {
                continue;
            }
            track.push(nums[i]);
            dep(nums, track);
            track.pop();
        }
    }
    dep(nums, track);
    return res;
}
;


console.log(permute([1,2,3]))
