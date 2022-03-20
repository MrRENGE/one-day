// 括号的生成
function generateParenthesis(n: number): string[] {
  let res: string[] = [];

  function backtrack (left: number, right: number, track: string[]) {
    // 退出边界
    if (left < 0 || right < 0) return ;
    // 有效的字符中左括号一定是大于等于右括号数量的， 
    // 因此当 left > right 时，证明字符中的左括号少于右括号
    if (left > right) return ;

    if (left===0 && right===0) {
      res.push(track.join(''));
    }


    track.push('(');
    backtrack(left-1, right, [...track]);
    track.pop();

    track.push(')');
    backtrack(left, right-1, [...track]);
    track.pop();

  }
  
  backtrack(n, n, [])

  return res;
};