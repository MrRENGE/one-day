function twoSum(nums, target) {
    var left = 0;
    var right = nums.length - 1;
    while (left < right) {
        var sum = nums[left] + nums[right];
        if (sum === target) {
            return [left, right];
        }
        if (sum < target) {
            left++;
        }
        else if (sum > target) {
            right--;
        }
    }
    return [-1, -1];
}

console.log(twoSum([1,2,4], 5))
