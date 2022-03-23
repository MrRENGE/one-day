// 手写MyPromise

class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  constructor(func) {
    this.promiseState = MyPromise.PENDING;
    this.promiseResult = null;
    this.onFulfilledCallback = []; // 多次 then
    this.onRejectedCallback = []; // 多次 catch 
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error);
    }
  }

  /**
   * 
   * @param {*} value 如果是 promise 则直接返回， 如果是带 then 函数的对象，则使用then的值作为 promise 决议值，
   * 其他值类型则 value 作为 promise的值处理
   * @return {*} promise resolve
   */
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    if (value !== null && typeof value === 'object') {
      if (typeof value.then === 'function') {
        return new MyPromise((resolve, reject) => {
          value.then(resolve, reject);
        });
      }
    }

    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  };


  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }



  static all(promises) {
    function hasIterator(target) {
      return target instanceof Array || target instanceof Map || target instanceof Set;
    }

    const result = [];
    let count = 0;

    return new Promise((resolve, reject) => {

      if (!promises.length) {
        resolve([]);
      }

      if (hasIterator(promises)) {
        promises.forEach((option) => {
          if (option instanceof Promise || (typeof option === 'object' && 'then' in option)) {
            MyPromise.resolve(option).then((data) => {
              count++;
              result.push(data);
              // 最后一个完成 resolve
              if (count === promises.length) {
                resolve(result);
              }
            }, (reason) => {
              reject(reason);
            })
          } else {
            // 处理普通数据
            result.push(option);
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          }
        });
      } else {
        reject(TypeError('arguments type is not iterator!'));
      }
    });
  }


  resolve(result) {
    if (this.promiseState === MyPromise.PENDING) {

      setTimeout(() => {
        this.promiseState = MyPromise.FULFILLED;
        this.promiseResult = result;
        this.onFulfilledCallback.forEach((cb) => {
          cb(this.promiseResult);
        })
      })
    }
  }

  reject(error) {
    if (this.promiseState === MyPromise.PENDING) {
      setTimeout(() => {
        this.promiseState = MyPromise.REJECTED;
        this.promiseResult = error;
        this.onRejectedCallback.forEach((cb) => {
          cb(this.promiseResult);
        });
      })
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.promiseState === MyPromise.PENDING) {
        this.onRejectedCallback.push(() => {
          try {
            let x = onRejected(this.promiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }

        });

        this.onFulfilledCallback.push(() => {
          try {
            let x = onRejected(this.promiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.promiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.promiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err)
          }

        }, 0)
      }

      if (this.promiseState === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.promiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)
      }

    })

    return promise2;
  }

  // 实际是就是 then(, onRejected) 的用法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * 不管 promise 决议后是 fulfilled 还是 rejected 都需要执行的回调，
   * 避免在 then 和 catch 的回调中重复写代码
   * @param {*} callback 
   * @returns 
   */
  finally(callback) {
    // 实际就是额外注册一次 then , 因为针对同一个 promise 决议后无论多少次调用 then 或者 catch 访问到的内容都是不变的。
    // 因此将 callback （通用的部分，比如埋点统计） 直接传递给 then 的两个参数可以避免重复写代码
    return this.then(callback, callback);
  }


}

// then 里面注册的 onRejected 、 onFulfilled  函数进行决议 。 
// 目的是 把 onRejected 和 onFulfilled 的结果向下传递，形成链式调用
// 1，如果 onRejected 、 onFulfilled 的返回值（命名为x）是 promise 那么采用该结果作为链式的基础 。
//     (1. x 的状态是pending 那么 . then 注册函数等待决议)
//     (2. x 的状态是其他 fulfilled 或者rejected 那么分别作为 把其 promiseResult 作为resolve、reject的值)
// 2, 如果 onRejected 、 onFulfilled 是function 或者 object 。那么使用鸭式变形 thenable 判断试一下
//    1、提取 then， 检测如果 then 是个函数那么执行这个函数【成功则以它的值作为 promise2的决议值 】
//     如果then 不是函数那么使用 x 作为 promise2的值 传递
// 3, 其他类型的值，则作为 promise2的值继续传递
// 4, 以上过程出现异常，promise2 决议为 rejected 
function resolvePromise(promise2, x, resolve, reject) {

  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  if (x instanceof MyPromise) {
    if (x.promiseState === MyPromise.PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject);
    } else if (x.promiseState === MyPromise.FULFILLED) {
      resolve(x.promiseResult);
    } else if (x.promiseState === MyPromise.REJECTED) {
      reject(x.promiseResult);
    }
  } else if (x !== null && (typeof x === 'object' || (typeof x === 'function'))) {
    try {
      var then = x.then;
    } catch (e) {
      return reject(e);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } catch (e) {
        if (called) return;
        called = true;

        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
}


// test start
console.log(1)
let p1 = new Promise((resolve, reject) => {
  console.log('p1 init---');
  resolve('p1 result');
});

console.log(2)

p1.then((data) => {
  console.log('p1 第一次 then', data);
});

console.log("++++++++++++++++")

p1.then((data) => {
  console.log('p2 第一次 then', data);
}).then((data) => {
  console.log('p1 第二次 then', data);
})
console.log(3)

// test end



class myPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  constructor(func) {
    this.PromiseState = myPromise.PENDING;
    this.PromiseResult = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(result) {
    if (this.PromiseState === myPromise.PENDING) {
      setTimeout(() => {
        this.PromiseState = myPromise.FULFILLED;
        this.PromiseResult = result;
        this.onFulfilledCallbacks.forEach(callback => {
          callback(result)
        })
      });
    }
  }

  reject(reason) {
    if (this.PromiseState === myPromise.PENDING) {
      setTimeout(() => {
        this.PromiseState = myPromise.REJECTED;
        this.PromiseResult = reason;
        this.onRejectedCallbacks.forEach(callback => {
          callback(reason)
        })
      });
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason;
    };

    let promise2 = new myPromise((resolve, reject) => {
      if (this.PromiseState === myPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.PromiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.PromiseState === myPromise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.PromiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        });
      } else if (this.PromiseState === myPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.PromiseResult);
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.PromiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    })

    return promise2
  }
}