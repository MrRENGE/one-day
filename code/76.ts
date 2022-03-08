function minWindow(s: string, t: string): string {
  let need: { [k: string]: number } = {};
  let window: { [k: string]: number } = {};

  // 窗口的左右位置
  let left = 0, right = 0;

  //  start 记录最小串的起点索引， len 记录长度
  let start = 0, len = Number.MAX_SAFE_INTEGER;

  // 用于记录是否找全
  let valid = 0;

  // 初始化 need
  for (let i = t.length - 1; i >= 0; i--) {
    need[t.charAt(i)] = need[t.charAt(i)]? need[t.charAt(i)] + 1: 1;
  }

  while (right < s.length) {
    let rightChart = s.charAt(right);
    // 窗口向右移动
    right++

    // 需要存的才加入窗口否则继续华东
    if (need[rightChart]) {

      window[rightChart] = window[rightChart] ? window[rightChart] + 1 : 1

      //  如果当前的字符是目标字符中的一个，并且是第一次加入窗口则 valid ++ 
      if (window[rightChart] === need[rightChart]) {
        valid++;
      }
    }

    while (valid === Object.keys(need).length) {
      // 取最值
      if ((right - left) < len) {
        start = left;
        len = right - left;
      }

      let deleteChart = s[left];
      left++;

      if (need[deleteChart]) {
        // 如果窗口中的字符是目标字符，仅有一个时去掉需要同步减少一个 valid
        if (window[deleteChart] === need[deleteChart]) {
          valid--;
        }

        window[deleteChart] = window[deleteChart] ? window[deleteChart] - 1 : 0;
      }
    }
  }

  return len === Number.MAX_SAFE_INTEGER ? '' : s.substring(start, start+len);

};

