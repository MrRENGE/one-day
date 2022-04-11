## String

​	string 普通表达式 或者String("xxx") 可生成字符串表达式，注意区分new String("xxx") 【对象类型】。对于string 上的通用方法调用，在调用访问前会进行装箱操作【方法的访问需要通过对象进行】。在做值转换的时候又会进行拆箱【ToPrimary】调用valueOf或者toString() 获取。【值类型都存在装箱与拆箱的问题】



### String.prototype.charAt(index)

charAt（）获取index位置的字符, index 值域[0, string.length-1] 超过时取值空字符串”“。index默认值是 0；注意，一个英文字母+普通汉子在js中都是占两个字节【unicode编码】多文种平面除外。

注意：在基础多文种平面中，一个 ”文字“ 需要用多个字节表示，”文字“在string中length对比时大于2。



```js
let a = "abc";
a.length; // 3
a.charAt(0); // "a"

// BMP 
a = '你'
a.length;// 2
a.charAt(0)//  '\uD87E'
a.charAt(1); // '\uDC04'

```



