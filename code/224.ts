
function calculate(s: string): number {

  s = s.replace(/\s*/g, "");


  function dp(s: string[]): number {
    let stack: number[] = [];
    let num = 0;
    let sign = '+';

    function isNumber(c: string): boolean {
      return Number(c) >= 0 && Number(c) <= 9
    }

    while (s.length) {
      let c = s.shift();
      if (isNumber(c)) {
        num = num * 10 + Number(c);
      }

      if (c === '(') {
        num = dp(s);
      }

      if (!isNumber(c) || (s.length === 1)) {
        // 符号
        switch (sign) {
          case '+':
            stack.push(num);
            break;
          case '-':
            stack.push(-num);
            break;
          case '*':
            let pre = stack.pop();
            stack.push(pre * num);
            break;
          case '/':
            let prev = stack.pop();
            stack.push(parseInt((prev / num) + ''));
            break;
        }

        num = 0;
        sign = c;
      }

      if (c === ')') {
        break;
      }

    }

    let res = 0;
    while (stack.length) {
      res += stack.pop();
    }
    return res;
  }


  return dp(s.split(''));

};
