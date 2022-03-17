function maxSlidingWindow(nums: number[], k: number): number[] {
  let window: number[] = [];
  let res: number[] = [];

  function add(data: number) {
    while(window.length && window[window.length-1] < data) {
      window.pop();
    }

    window.push(data);
  }

  function move(data: number) {
    if (data===window[0]) {
      window.shift();
    }
  }

  for (let i = 0; i<nums.length; i++) {
    if (i<k-1) {
      window.push(nums[i]);
    } else {
      // 加进去
      add(nums[i]);
      // 取最大值
      res.push(window[0]);
      // 移动窗口
      move(nums[i-k+1])
    }

  }

  return res;

};