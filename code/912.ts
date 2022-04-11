// 快排
function quickSort(nums: number[]): number[] {

  // 洗牌
  function suffle(nums: number[]) {
    let len = nums.length;
    for (let i = 0; i < len; i++) {
      let r = Number((Math.random() * (len - i)).toFixed());
      swap(nums, i, r);
    }
  }

  function swap(nums: number[], i: number, j: number) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  if (nums.length <= 1) {
    return nums;
  }

  function sort(nums: number[], low: number, hight: number) {
    if (low >= hight) {
      return;
    }
    let p = partion(nums, low, hight);
    sort(nums, low, p - 1);
    sort(nums, p + 1, hight);
  }

  function partion(nums: number[], low: number, hight: number): number {
    let i = low + 1, j = hight, flag = nums[low];
    while (i <= j) {
      while (i < hight && nums[i] <= flag) {
        i++;
      }
      while (j > low && nums[j] >= flag) {
        j--;
      }

      if (i >= j) {
        break;
      }

      swap(nums, i, j);
    }
    swap(nums, low, j);
    return j;
  }

  if (nums.length <= 1) {
    return nums;
  }

  suffle(nums);
  sort(nums, 0, nums.length - 1);

  return nums;

};


// 归并排序
function depSort(nums: number[]) {

  function sort(nums: number[], low: number, hight: number) {
    if (low === hight) {
      return;
    }
    let mid = low + Math.floor((hight - low) / 2);

    sort(nums, low, mid);
    sort(nums, mid + 1, hight);

    merge(nums, low, mid, hight);
  }

  function merge(nums: number[], low: number, mid: number, hight: number) {
    for (let i = low; i <= hight; i++) {
      temp[i] = nums[i]
    }

    let i = low, j = mid + 1;

    for (let p = low; p <= hight; p++) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hight + 1) {
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  }


  if (nums.length <= 1) {
    return nums;
  }

  const temp: number[] = [];
  temp.length = nums.length;
  sort(nums, 0, nums.length - 1);

} 

