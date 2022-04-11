const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object, Array]";

const objectTag = "[object Object]";

const isObject = (target) => {
  return typeof target === "object" && target !== null;
};

const hasPrototype = (target)=>{
  const Ctor = target && target.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
  return  target === proto;
};

const createResult = (target) => {
  return hasPrototype(target) ? Object.create(Object.getPrototypeOf(target)) : {};
}

function deepClone(obj) {
  let stack = new Map();

  function clone(target) {
    let isObj = isObject(target);

    if (!isObj) {
      return target;
    }

    let tagType = Object.prototype.toString.call(target);

    // 避免循环引用，先检测是否遍历过
    let cache = stack.get(target);

    if (cache) {
      return cache;
    }

    let result = createResult(obj);

    // 引用类型存入 stack 中避免循环引用
    stack.set(target, result);

    if (tagType === mapTag) {
      for (let [value, key] of target) {
        result.set(key, clone(value));
      }
      return result;
    }

    if (tagType === setTag) {
      for (let item of target) {
        result.add(clone(item));
      }
      return result;
    }

    if (tagType === arrayTag) {
      
      return target.map((item)=>{
        return clone(item);
      })
    }

    if (tagType === objectTag) {
      let keys = Object.keys(target);
      for (let item of keys) {
        result[item] = clone(target[item]);
      }
      return result;
    }

    return target
 
  }

  return clone(obj);
} 

// test
let  a = { a: {name: 'a-a', b:12}, c: [12,{ name:'c-c'}] }
let b = deepClone(a);

console.log('a', a);
console.log('b', b);

a.a.c = a;

let c = deepClone(a);

console.log("+++++++++++++++++");
console.log('a', a);
console.log('c', c);


