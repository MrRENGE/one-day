
function permutation(s: string): string[] {
  let data = s.split('');
  let res: string[] = [];
  let cache:{ [k:string]: number } = {};

  function getCount(source: string[], op: string): number {
    if (data===source) {
      if (cache[op]) {
        return cache[op];
      } else {
       let result = source.filter((item) => item === op).length;
        cache[op] = result;
        return result;
      }
    }
    return source.filter((item) => item === op).length;
  }

  function dep(nums: string[], track: string[]) {
    if (nums.length === track.length) {
      let result = track.join('')
      if (res.includes(result)) {
      } else {
        res.push(result);
      }
      return ;
    }

    for (let i = 0; i < nums.length; i++) {
      let c = nums[i];
      let hasRepeat = getCount(nums, c);

      if (hasRepeat-1) {
        if (hasRepeat === getCount(track, c)) {
          continue;
        }
      } else {
        if (track.includes(c)) {
          continue;
        }
      }

      track.push(c);
      dep(nums, [...track]);

      track.pop();
    }
  }

  dep(data, []);

  return res;
}
