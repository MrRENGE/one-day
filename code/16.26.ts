
function calculate(s: string): number {

  s = s.replace(/\s*/g,"");

  let stack: number[] = []; 
  let num = 0;
  let sign = '+';

  function isNumber(c: string):boolean {
    return Number(c)>=0 && Number(c)<=9
  }

  for (let i=0; i<s.length; i++) {
    let c= s[i];
    if (isNumber(c)) {
      num = num * 10 + Number(c);
    } 
    if (!isNumber(c) || (i === s.length-1)) {
      // 符号
      switch(sign) {
        case '+' : 
          stack.push(num);
          break;
        case '-':
          stack.push(-num);
          break;
        case '*':
          let pre = stack.pop();
          stack.push(pre*num);
          break;
        case '/':
          let prev = stack.pop();
          stack.push(parseInt((prev/num)+''));
          break;
      }

      num = 0;
      sign = c;
    }

  }

  let res = 0;

  while(stack.length) {
    res += stack.pop();
  }

  return res;

};
