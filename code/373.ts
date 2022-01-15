function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  // 最小值 ，最大值
  let min = nums1[0] + nums2[0];
  let max = nums1[nums1.length - 1] + nums2[nums2.length - 1];
  const result: Array<Array<number>> = [];

  // 求出接近与第 k 最小个和的 max
  while (min < max) {
    let mid: number = Math.round((min + max -1)/2);
    let position1 = 0,
      position2 = nums2.length - 1,
      count = 0;
    
    while (position1 < nums1.length && position2 >= 0) {
      if (nums1[position1] + nums2[position2] > mid) {
        position2--;
      } else {
        count = count + position2 + 1;
        position1++;
      }
    }
  
    if (count >= k) {
      max = mid;
    } else {
      min = mid + 1;
    }

  }

  let position1 = 0,
      position2 = nums2.length - 1;
  
  // 前边我们找到大于等于 k 个之和的最小值, 这儿用 max 和 min 实际上差不多，两个值最后趋于相等
  while(position1 < nums1.length && position2 >= 0) {
    if (nums1[position1] + nums2[position2] >= max) {
      position2--;
    } else {
      // 左侧固定，右侧开始移动，将符合的先选出
        for (let i = 0; i <= position2 && k > 0; i++, k--) {
          result.push([nums1[position1], nums2[i]]);
        }
        position1++;
    }
  }

  // 右侧下标回到最大值
  position2 = nums2.length - 1;

  for (let i = 0; i < nums1.length; i++) {
    // 从
    while (position2 > 0 && nums1[i]+nums2[position2] > max){
      position2--;
    }

    for (let j = position2; j>=0 && (nums1[i]+nums2[j]) === max && k>0; j--, k--) {
      result.push([nums1[i], nums2[j]]);
    }
  }

  return result;

};
