function findAnagrams(s: string, p: string): number[] {
  let left = 0, right = 0, valid=0;
  let need: { [k:string]:number } = {}, 
      window: { [k:string]:number } = {},
      res: number[] = [];
  // 初始化need
  for (let i = p.length-1; i >= 0; i--) {
    let c = p.charAt(i);
    need[c] = need[c] ? need[c] + 1 : 1;
  }


  while(right<s.length) {
    let newChart = s.charAt(right);
    right++;

    if (need[newChart]) {
      window[newChart] = window[newChart] ? window[newChart] + 1 : 1;
      if (window[newChart] === need[newChart]) {
        valid++;
      }
    }

    // shrink window 
    while((right-left) >= p.length) {
      
      if (valid===Object.keys(need).length) {
        res.push(left);
      }

      let deleteChart = s.charAt(left);

      left++;

      if (need[deleteChart]) {
        if (window[deleteChart] === need[deleteChart]) {
          valid--;
        }
  
        window[deleteChart] = window[deleteChart] - 1;
      }
    }
  }

  
  return res;
};