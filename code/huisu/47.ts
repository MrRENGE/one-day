function permuteUnique(nums: number[]): number[][] {
  let res: number[][] = [];
  let track: number[] = [];

  function hasRepeat(arr:number[], op): number {
    return arr.filter((item)=> item===op).length;
  }

  function dep (nums: number[], track: number[]) {
    if (nums.length === track.length) {
      res.find((item)=>{
        return item.join(',') === track.join(',')
      }) || res.push([...track]);
      return ;
    }

    for (let i = 0; i<nums.length; i++ ) {

      if (hasRepeat(nums, nums[i])-1) {
        if (hasRepeat(track, nums[i]) === hasRepeat(nums, nums[i])) {
          continue;
        }
      } else {
        if (track.includes(nums[i])) {
          continue;
        }
      }

      track.push(nums[i]);
      dep(nums, track);

      track.pop()

    }
  } 

  dep(nums, track)

  return res;
};

