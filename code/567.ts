function checkInclusion(s1: string, s2: string): boolean {
  
  let need: { [k:string]:number } = {};
  let window: { [k:string]:number } = {};

  let left = 0, right = 0;

  let valid = 0;

  for (let i=s1.length-1; i >= 0; i--) {
    let c = s1.charAt(i);
    need[c] = need[c] ? need[c] + 1 : 1;
  }

  
  while(right<s2.length) {
    let newChart = s2.charAt(right);

    right++;

    if (need[newChart]) {
      window[newChart] = window[newChart] ? window[newChart] + 1 : 1;

      if (need[newChart] === window[newChart]) {
        valid++;
      }
    }

    // 收缩窗口
    while((right-left) >= s1.length) {
      // 找到则退出
      if (valid === Object.keys(need).length) {
        return true;
      }
      
      let deleteChart = s2.charAt(left);

      left++;

      if (need[deleteChart]) {
        if (window[deleteChart] === need[deleteChart]) {
          valid--;
        }

        window[deleteChart] =  window[deleteChart] - 1;
      }
    }
  }
  
  return false;
};