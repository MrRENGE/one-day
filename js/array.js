

const range = (start, stop, step) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}


range(1, 10, 1); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
range(1, 10, 2); // [1, 3, 5, 7, 9]

// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map((item) => String.fromCharCode(item));

function joinFn(arr, sepatator) {
  // 实际应该处理成 likeArray 判断
  if (!Array.isArray(arr)) {
    throw TypeError(" arr not Array")
  }

  let sep = ',', result = '';
  if (sepatator !== undefined) {
    sep = String(sepatator);
  }

  for (let i=0; i<arr.length-1; i++) {
    result += arr[i] + sep;
  }

  return result + arr[arr.length-1];
}

console.log(joinFn([1,2,3,4], null), [1,2,3,4].join(null));
console.log(joinFn([1,2,3,4], "-"), [1,2,3,4].join("-"));
console.log(joinFn([[1],2,[3,[[3]]],4], "+"), [[1],2,[3,[[3]]],4].join("+"));


/**
 * promise 顺序执行
 * @param {*} arr 顺序执行的函数
 * @param {*} input 初始输入
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce((promiseChian, currentFunction)=>{
    return promiseChian.then(currentFunction)
  }, Promise(input))
};

function f1(data) {
  console.log(data, "f1")
  return data + 1;
}

function f2(data) {
  return new Promise((resolve)=>{
    console.log(data, "f2");
    resolve(data*2)
  })
}

function f3(data){
  console.log("f3",data);
}

runPromiseInSequence([f1,f2,f3], 10);




function pipe(...functions){
  return (input)=>{
    return functions.reduce((pre, func)=>{
      return func(pre);
    }, input)
  }
}

const double = (x)=> x + x;

const trible = (x) => x*x;

pipe(double, trible)(10)



class Fathe {
  foo (name){
    console.log("father foo", name)
  }
  fatherFunc(){
    console.log("fatherFunc...")
  }
}

class Son extends Father {
  foo(){
    console.log("Son foo");
  }
}

let person = new Son();
person.foo("XXX");

person.fatherFunc()
