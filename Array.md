## Array 数组上的操作方法



## 静态函数



### Array

Prams:  如果只有一个参数, 并且是数字那么按照该数字大小作为数组长度新建空数组 [empty*n]，负数报错，其他类型单个参数以及所有多个参数，都返回按照prams顺序组成的数组。

### Array.from(arrayLike[,mapFn[,thisArg]])

arrayLike 是一个可迭代的对象或类数组，支持类数组【存在，length 属性】Map、Set、Array、String

mapFn 可选参数，新数组中的每个子项都会执行执行时改函数，

thisArg可选参数是执行mapFn时的this。

``` js
let arr1 = [1,2,3];
console.log(Array.from(arr1, (x)=>{return 2*x})); // [2, 4, 6]
console.log(Array.from('foo',(x)=>{return x+1})); // ['f1', 'o1', 'o1']


const range = (start, stop, step) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}


range(1, 10, 1); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
range(1, 10, 2); // [1, 3, 5, 7, 9]

// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map((item) => String.fromCharCode(item));

```

注意：from 的第二个参数类似map的参数格式 (value, index)



### Array.isArray(obj)

用于判断 obj 是否是数组类型，跨 iframe 数组实例均能正确判断。注：Array.isArray(Array.prototype) 返回 true 。



### Array.of()



## 实例方法



### Array.prototype.at(index)

从数组上读取 index 位置的值，如果是负数则从末尾向前取值，正数从前向后取值。

```js

console.log([1,2,3,4,5].at(2)) // 3
console.log([1,2,3,4,5].at(-2)) // 4

```



### Array.prototype.concat(val1[,val2[,valN]])

将多个数组或值进行拼接，返回一个新的数组。

```js

[1,2,3].concat(11,['a','b']) // [1, 2, 3, 11, 'a', 'b']
[1,2,3].concat(11,['a','b'], ['c']) // [1, 2, 3, 11, 'a', 'b', 'c']

```

拼接的数组中存在引用类型，则是浅拷贝（引用的还是同一个内存地址上的数据）。



### Array.prototype.copyWithin(target[, start[, end]])

将数组中的指定段 start- end 之间的内容拷贝插入 target 位置，如果end 为负数则从末尾向前寻找位置。如果不给end值则默认拷贝到最后。不改变原数组的长度，返回新的数组，原数组内容会被修改。

``` js
let arr1 = ['a', 'b', 'c', 'd'];
let arr2 = arr1.copyWithin(0, 1,2);

// arr1: ['b', 'b', 'c', 'd']
// arr2 : ['b', 'b', 'c', 'd']

// arr1 === arr2 return true
```



### Array.prototype.entries()

返回一个符合 Array Iterator 的迭代器对象。

```js
let arr1 = [1,2,3];
let ite1 = arr1.enties();

console.log(ite1.next().value); // [0,1] [index, value]

```



### Array.prototype.every(fn)

用于测试数组中的所有选项是否满足测试函数 fn，全部通过fn测试则返回true。 fn 需要返回测试结果。

```js
let arr1 = ['a', 'b', 'c'];

arr1.every((value, index)=>{
  console.log(value,index);
  return value.charCodeAt(0)>=97;
})

// a 0
// b 1
// c 2
// result true
```





### Array.prototype.fill(value[,start[,end]])

使用value 固定填充数组中从，start 到 end-1 的所有内容。注意位置到end-1（也就是不包含end），如果start 或 end 为负数那么对应的就是【length+start、length+end】来确定范围。

```js
let arr1 = [1,2,3,4];
arr1.fll(4); // [4,4,4,4]
// 注意： fill 是修改原数组

```



### Array.prototype.filter(fn(element[, index[, array]]), thisArg)

返回一个新的数组，包含所有通过测试函数（返回值 truth ）的元素。 fn测试函数接受3个参数，elemnt、index、array（this）。





### Array.prototype.find(callback([, thisArg]))

​	返回数组中第一个通过测试函数的元素，如果没找到返回 undefined 。 callback 接收三个参数 【element， index， array】，thisArg则是可指定callback执行时的 this 环境。



### Array.prototype.findeIndex(callback[, thisArg])

返回数组中第一个通过测试函数的元素索引，如果没找到返回-1。参数内容同find。





### Array.prototype.flat(depth)

将数组按照一定的深度进行平铺，depth默认值为1. 返回一个包含平铺后的所有元素的新数组，不改变原数组。

```js
let arr1 = [1,[2,3], [[[4,5,6]]], [[[[[7,8]]]]]];

console(arr1.flat()); // [1,2,3,[[4,5,6]],[[[[7,8]]]]]

console.log(arr1.flat(2)); // [1,2,3,[4,5,6],[[[7,8]]]]
console.log(arr1.flat(10)); // [1, 2, 3, 4, 5, 6, 7, 8]

// 可以结合 concat 与 reduce 进行递归平铺数组
const deepClone = (arr, depth=1) => {
  	return depth > 0 ? arr.reduce((ac, cu)=>{
      return  ac.concat(Array.isArray(cu) ? deepClone(cu,depth-1) : cu);
    }, []) : arr.slice();
};

```





### Array.prototype.forEach(callback(currentValue[, index[, array]])[thisArg])

forEach对数组中所有元素执行一遍测试函数，forEach不会改变数组，但是回调函数可能会改变数组。



### Array.prototype.includes(element[, startIndex])

从数组中寻找元素，从startIndex开始。如果找到则返回 true， 找不到则返回 false。 能识别 NaN。

```js
[1,2,NaN].includes(NaN)// true 
```



### Array.prototype.indexOf(elementValue[, fromIndex])

从数组中寻找元素的下标，如果找到则返回对应的下标，没找到则返回-1。

在寻找位置类api中：fromIndex 都是一样的处理逻辑，【1、如果fromIndex比length还大，直接不找了 找元素的返回undefined，找索引的返回-1，判断的返回 false。2、负数情况下，length+fromIndex 如果在0-length-1之间那么接着找，到length-1这段， 还是负数的不继续找了 同1的逻辑】





### Array.prototype.join([separator])

使用 separator 进行元素连接。返回一个字符串 separator 连接的。

```js
[1, [2], [[[4]]], [[5]]].join("-");

```

```js

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


```



### Array.prototype.reduce(callback(previousValue[,currentValue[, currentIndex[, array]])[initialValue])

将数组从头到尾执行一遍，将上一次的结果作为第一个参数传递执行。返回最后执行结果，第二个参数时initialValue 如果不传递那么第一次执行时previousValue、currentValue 分别取前两个。



如果不传递initialValue，且数组是空数组，那么抛出错误。

```js
[].reduce((pre,cu)=>pre+cu) ;// Uncaught TypeError: Reduce of empty array with no initial value

```



用于实现找到数组中的最大值，

```js
[1,2,4,2,5,10].reduce((pre,cu)=>Math.max(pre, cu))
```



### Array.prototype.reduceRight(callback()[initialValue])

从右向左执行reducer。方法原理同 reduce 类型。



### Array.prototype.reverse()

将数组进行反转，，修改原数组，返回数组引用。

likeArray 可以执行Array。prototype.reverse.call(this)

```js
let ar = { 0:1, 1:2,3:3, length: 4} 
Array.prototype.reverse.call(ar); // {0: 3, 2: 2, 3: 1, length: 4}

[1,2,3].reverse() ;// [3,2,1]

```



### Array.prototype.slice([startIndex[, endIndex]])

浅拷贝数组从startIndex 到endIndex-1 之间的元素。返回新的数组，对原数组没有影响。如果startIndex 缺失默认从0开始， 如果startIndex 是负数则表示从倒数第startIndex 个开始截取。 注意不包含 endIndex。



```js
[1,2,3,4,5,6,7].slice(2,4); // [3, 4]
```







### Array.prototype.sort(compareFunc(element1, element2));

sort 是稳定的原地排序算法，支持可选参数 compareFunc 。默认情况下是按照字符串大小比较结果作为默认compareFunc。

1，如果compareFunc 不稳定，那么得到的数据可能是不可与预判的值。

2, compareFunc 返回值规则【返回值大于0 不做交换, 0 不做交换， 小于零 需要交换位置 】。

```js

[1,5,3,6,2,4].sort((element1, element2)=>{
  	return element1-element2
})// [1,2,3,4,5,6]

```





### Array.prototype.splice(start, deleteCount, [...item])

splice【翻译为，胶接】。 从start 位置开始，删除deleteCount个元素，并把 item 插入删除后的位置。修改原数组，返回删除的内容



```js
let  a = [1,2,3,4,5]
a.splice(1,2, "444"); // [2, 3]  从a[1] 开始 删除2个元素
a; // [1, "444", 4, 5]

```

