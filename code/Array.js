let arr = [];

arr[1] = 123;
console.log(arr, arr.length,); // [ <1 empty item>, 123 ] 2

// 增加浮点索引
arr[1.01] = 1.01;  

console.log(arr, arr.length,); // [ <1 empty item>, 123, '1.01': 1.01 ] 2

arr['abc'] = 'abc';

console.log(arr,arr.length,); // [ <1 empty item>, 123, '1.01': 1.01, abc: 'abc' ] 2

// 增加一个数字类型下标
arr['2'] = 123; 
console.log(arr, arr.length,); // [ <1 empty item>, 123, 123, '1.01': 1.01, abc: 'abc' ] 3

// 引用类型索引
let a = [3];

arr[a] = 'this index is other Array value';
console.log(arr, arr.length);
// [
//   <1 empty item>,
//   123,
//   123,
//   'this index is other Array value',
//   '1.01': 1.01,
//   abc: 'abc'
// ] 4



// 复制对象
let obj = {
  a: 123,
  ref: [],
};

let ob2 = [1,2,3];
obj.ref.push(ob2, obj);

console.log(obj,"obj");

let assignObj = Object.assign({}, obj);

console.log(assignObj===obj, assignObj);

let data = {
  a: 123,
  b: 'xxx',
  c: [1,2,3]
};

let copyData = JSON.parse(JSON.stringify(data));

console.log(data===copyData, copyData); // false { a: 123, b: 'xxx', c: [ 1, 2, 3 ] }


let abj = {
  a: 123,
};


console.log(Object.getOwnPropertyDescriptors(abj, 'a'));
// {
//   a: { value: 123, writable: true, enumerable: true, configurable: true }
// }


let obj1 = {
  name: 'xxx'
};

Object.preventExtensions(obj1);
obj1.a = 111;

console.log(obj1) // { name: 'xxx' }



let obj11 = {
  a: 'a1',
  b: 'b1',
  c: 'c1',
};

Object.defineProperty(obj11, 'a', {
  enumerable: false
})

obj11.__proto__.aa = 234;

for ( let key in obj11 ) {
  console.log(key, obj11[key]);
}

// b b1
// c c1
// aa 234


let aa = {
  foo: 'foo'
};


let bb = Object.create(aa);

console.log(bb.foo);

bb.foo = '123';

console.log(bb.foo);
console.log(aa.foo);
