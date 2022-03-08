
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length-1;

  while (left<right) {
    let mid = left + Math.round((right-left)/2);

    if (nums[mid]===target) {
      return mid;
    }
    
    if (nums[left] <= nums[mid]) {
      if (nums[mid] > target && target>=nums[left]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }

    } else {
      if (nums[mid]<target && nums[right]>=target) {
        left = mid + 1;
      } else {
        
        right = mid - 1
      }
    }
  }

  return -1;
};


function left_bounds(nums: number[], target:number):number{
  let low = 0;
  let hight = nums.length-1;

  while (low <= hight) {
    let mid = low + Math.round((hight-low)/2);
    if (nums[mid]===target) {
      hight = mid-1;
    } else if (nums[mid]>target) {
      hight = mid - 1;
    } else if (nums[mid]<target) {
      low = mid + 1;
    }
  }

  // return nums[low]===target ? low : -1
  if (low>nums.length-1 || nums[low]!=target) {
    return -1;
  }

  return low;
}


function right_bounds(nums: number[], target: number): number{
  let left = 0;
  let right = nums.length - 1 ;

  while (left <= right) {
    let mid = left + Math.round((right-left)/2);

    if (nums[mid] === target) {
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  if (right < 0 || nums[right] != target) {
    return -1
  }
  return right;
}
