function search(nums, target) {
    var left = 0;
    var right = nums.length - 1;
    while (left < right) {
        var mid = left + Math.round((right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[left] <= nums[mid]) {
            if (nums[mid] > target && target >= nums[left]) {
                right = mid - 1;
            }
            else {
                left = mid + 1;
            }
        }
        else {
            if (nums[mid] < target && nums[right] >= target) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
;
function left_bounds(nums, target) {
    var left = 0;
    var right = nums.length - 1;
    while (left <= right) {
        var mid = left + Math.round((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (target < nums[mid]) {
            right = mid -1;
        } else if (nums[mid] === target) {
            right = mid - 1;
        }
    }
    // return nums[left]===target ? left : -1
    if (left > nums.length-1 || nums[left] != target) {
        return -1;
    }
    return left;
}
console.log(left_bounds([2, 3, 3,4,4, 5], 4));
