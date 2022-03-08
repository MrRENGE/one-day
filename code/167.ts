function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length -1;
  
  while(left<=right) {
    // let mid = left + Math.round(((right+left)/2));
    let sum = numbers[left] + numbers[right];
    if (sum===target) {
      return [left+1, right+1];
    } else if (sum<target) {
    //   right = mid -1 ;
    left++;
    } else if (sum>target) {
    //   left = mid + 1;
    right--
    }
  }
};
