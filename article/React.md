## React解决什么问题？

​		前端的三大基础组成是 HTML、CSS、JS。使用原生开发一个中大型web项目时，模块化、DOM操作以及开发体验都有很大的挑战，React 解决了模块化问题、DOM 操作、最小程度的降低render的成本提升【虚拟DOM边界控制】。实现关注点分离，开发应该关注的是业务逻辑，而不是把更多的精力在维护代码之间的各种关系上。个人理解和编程语言的变化很相似：机器码 -> 汇编 -> 高级语言 -> 框架。都是最大程度的降低开发的成本，提升开发体验，降低门槛。风险在于如果不了解框架的API背后的原理，则很难发挥出真正的威力【学会框架怎么使用->了解框架底层API实现->学习开发框架的高级语言->深入研究高级语言底层（规范）-> 转换机器码的执行逻辑【编译器与C++】->汇编/底层】有可能走了许多路，始终都到不了最底层的核心，但是这是成神之路吧。



## React 的理念

React 的理念是**快速响应**，快速响应限制是CPU和IO。现今主流浏览器的刷新频率是 60HZ，1000/60 = 16.6 ms ，因此每一帧的最大时间是 16.6ms ，超过这个时间人眼就可能捕获到卡顿 。 因此需要在这个期间完成  ` js执行 浏览器布局 渲染` 但是在浏览器中间 **GUI 渲染线程**和 **JS 引擎线程**是互斥的。js执行超过16.6ms GUI 就没有时间进行渲染，页面就会掉帧。

**通过时间切片解决CPU瓶颈**。React 为了处理这个问题，将时间预留一段时间【初始5ms】进行js执行。如果这段时间内js还没执行完成，那么需要将时间交给浏览器进行布局-渲染，下一桢接着回来执行剩余js。这种将长任务切成不同的片段在各个时间片中执行，称为时间切片。【**通过时间切片，把同步的更新变成可中断的异步更新**】。

**IO** 部分对前端来说限制最大的是网络延时，`React`实现了[Suspense (opens new window)](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)功能及配套的`hook`——[useDeferredValue (opens new window)](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)。



## React V15 架构与缺陷

React 15 架构中主要分为两个大的部分 Reconciler （协调器）、Renderer（渲染器）。在 React 组件中我们可以通过 **this.setState** **this.forceRender** 、**ReactDom.render** 等API触发更新。工作原理：



**Reconciler** 

+ 调用组件的 render 将jsx转换成虚拟DOM
+ 对比前后两次虚拟DOM差异【找到需要更新的虚拟DOM】
+ 找到本次需要更新的虚拟DOM
+ 通知 Renderer 渲染变化后的虚拟DOM



**Renderer**

将虚拟DOM渲染到宿主中，不同的环境有不同的渲染器。web中通常是 ReactDOM 。除此之外还有 ReactNative 渲染器、ReactArt 渲染到canvass、svg中的渲染器。

**React15 中的缺陷【掉帧的真正原因】**。Reconciler 在对 组件进行协调过程中，针对 mount 组件（第一次挂载）会调用 **mountComponent** 针对 update 组件则会调用 **updateComponent** 两个函数都会递归的遍历子组件。递归更新一开始就不能中断，递归时间超过16.6ms用户就会出现卡顿。



## React 16 新架构

React 16 架构分为 3 层，分别是 **Scheduler** 、**Reconciler**、**Renderer**  。实现任务带优先级的任务调度以及可中断的更新。其中,当组件接受到更新时先由 Scheduler 进行调度，如果没有高优的时间任务需要执行，那么将任务交给 Reconciler 进行协调【协调过程中判断】。

**Scheduler【调度器】** 

​	实现可调度任务优先级以及空闲时间触发执行，浏览器新特性 requestIdleCallback 在浏览器空闲的时候执行注册的回调。因为浏览器的兼容性问题以及 requestIdleCallback 稳定问题【浏览器tab之间切换时，之前的tab函数执行的频率会变低】。React 实现了增强版的 requestIdleCallback 。

* 任务优先级调度
* 空闲时间调度高优先级任务

**Reconciler**

React 15 是递归进行的子组件遍历对比虚拟DOM，React16 换成 while 循环。每次循环都需要调用 shouldYield 判断当前是否还剩时间。Reconciler 在空闲时间中diff 虚拟DOM 并打上标签【update、delete、placementAndUpdate等（源码中标记时使用两个字节的二进制表示的）】，只要Reconciler 没执行完就不会交个 Renderer 所以并不影响。Reconciler 采用了 Fiber 架构。



**Renderer 渲染器** 

和 React 15 一样，更具Reconciler 给的带标记虚拟DOM进行渲染。

## Fiber架构

React 内部实现的一套状态更新机制，支持优先级、任务执行过程中可中断可恢复，并且恢复后可以拿到中断前的结果继续执行。这样一套机制类似 js 中的 Generator 但比 Generator 强大。其中任务更新单元是 React Element 对应的 Fiber 节点【一个Fiber节点对应一个React-Element】。这就是 Fiber。

* Fiber 在Reconciler 层次称为 Fiber Reconciler ，React15 的是 Stack Reconciler 。
* Fiber 作为静态数据结构，表示的意义是存储React-Element对应的属性信息【组件类型等】以及DOM内容。
* Fiber  作为动态的工作单元来说。Fiber 中存储了本次更新中组件更新的状态，需要做的动作【更新、删除，替换等】



### Fiber 数据结构

* 静态数据结构【tag、key、elementType、type、stateMode】
* 用于链接其他Fiber节点形成Fiber树。【return、child、sibling、index、ref】 （return 指向父级Fiber、child指向子Fiber、sibling 指向右边第一个兄弟节点）
* 作为动态工作单元的数据存储【pendingProps、memoizedProps、updateQueue、memoizedState、dependencies、effectTag、nextEffect、firstEffect、lastEffect】
* 调度优先级相关【lanes、childLanes】
* 指向fiber另一次更新时对应的 Fiber 【alternate】, 在diff复用的时候大显神威



### Fiber工作原理

Fiber 中采用**双缓存** 在内存中同时存在两棵**Fiber**树，一个是当前渲染在屏幕上的节点对应的Fiber树称为 **current Fiber树**。另一棵是正在构建中的Fiber树称为 **workInProgressFiber 树**。两棵树中对于同一个React Element 节点，通过 【alternate】 属性进行关联。每次状态更新的时候生成新的 **workInprogress Fiber** 然后替换 current ，完成DOM更新。



**mount**

1、首次执行 **ReactDOM.render** 时会创建 **fiberRootNode** 和 **rootFiber**。其中 **fiberRootNode** 是整个应用的根Fiber，rootFiber 则是<App/> 的根Fiber。``fiberRootNode.current = rootFiber``。 第一次渲染时 rootFiber 是 null 。

2、接下来进入 **render 阶段**，从 jsx 返回的内容创建Fiber节点根据【return、child、sibling】等连接构成Fiber树，这颗树也就是 workInProgress Fiber 树。构建过程中会尝试复用 current Fiber树。

3、构建完成 workInProgress Fiber 树后进入到 **commit 阶段** 。将Fiber 树渲染到 DOM上。



**update** 

出现组件更新时 state 变化、forceRender 等。也是先 **render阶段** 构建workInProgress Fiber树 提交到 **commit阶段** 进行渲染，不过这个过程中会大量复用current Fiber 【复用识别逻辑称为 diff 算法】。



### Fiber 架构——render阶段

​	Fiber 架构中 render 阶段指的是 Fiber  Reconciler 阶段，React 15 称之为 Stack Reconciler。Fiber 是一颗树，构建过程也可以理解成“递归” 实现则是循环实现的并不是编程实现上的递归。此处的“递归” 指的是处理 Fiber 的顺序过程。

**递归之“递”部分**

从 rootFiber 节点开始深度优先遍历节点，遍历的每个节点调用 **beginWork** 【该方法会根据传入的Fiber节点，创建子Fiber节点，并把它们关联起来形成Fiber树】。当遍历到叶子节点时（也就是组件没有子组件了）开始“归”。

**递归之“归”部分**

在“归”阶段，每个Fiber 开始调用 **completeWork** 函数。“归”的顺序是，（从叶子节点开始的）当前节点执行完completeWork，如果存在兄弟节点则会进入兄弟Fiber节点的“递”阶段，如果不存在兄弟节点则进入父Fiber节点的“归”阶段。当归执行到rootFiber 结束。



【插图——已拍照】



**beginWork**



### Finer架构——commit 阶段

在 render 阶段的结果都存在 Fiber 树上，commitRoot 开始就是commit 阶段【也就是Renderer】。在rootFiber 上保存了effectList的入口【单链表】。在这些 Fiber 节点的 updateQueue 上保存了变化的props。effectList  对应的DOM副作用将在commit 阶段执行。

commit阶段主要的工作内容： 执行一些生命周期钩子（componentDidXXX）和 hooks、执行DOM操作、执行DOM操作后（优先级的重置、ref等）



**before mutation 【执行 DOM 前】**

处理DOM删除/渲染后的autoFocus、blur等函数绑定、调用getSnapshotBeforeUpdate、调度 useEffect 。注意：React 16 从Stack Reconciler  重构成 Fiber Reconciler 后，render 阶段任务是支持中断再恢复执行的，因此render 阶段的生命周期（componentWillXXX）系列生命周期函数存在被多次调用的风险。因此React 16 对（componentWillXXX）生命周期标记为 UNSAFE_ 。 并提供新的API getSnapshotBeforeUpdate 支持 before mutation 之前执行声明周期，因为 getSnapshotBeforeUpdate 是在commit 阶段执行的，不会被重复执行。

useEffect 异步调用（防止阻塞浏览器），调用分为三个部分。

> 1. `before mutation阶段`在`scheduleCallback`中调度`flushPassiveEffects`
> 2. `layout阶段`之后将`effectList`赋值给`rootWithPendingPassiveEffects`
> 3. `scheduleCallback`触发`flushPassiveEffects`，`flushPassiveEffects`内部遍历`rootWithPendingPassiveEffects`



**mutation 【执行DOM操作】**

 + commitMutationEffects 遍历effectList对每个节点执行

   + 根据 ContentReset effectTag 上的标记重置节点文字
   + 更新 Ref
   + 处理 effectTag 【Placement` | `Update` | `Deletion】，Hydrating 是服务端SSR时定制类型。

 + Update Effect 【主要是执行 useLayoutEffect 的 销毁回调】

   + 主要是执行 useLayoutEffect 的 销毁回调

 + Delete Effect

   + 递归调用Fiber节点及其子孙节点 Fiber上 tag 标注为 ClassComponent 的 **componentWillUnmount** 生命周期钩子
   + 解绑 ref
   + 调度 useEffect 的销毁函数。

   ``` react
   useEffect(()=>{
     return ()=>{
       // useEffect 销毁函数
     }
   })
   ```



**layout 【执行DOM操作后】**

经过 mutation 后 DOM 已经渲染完成，此时的 layout 阶段触发的内容都可以直接访问到真实的 dom 。layout 阶段也是遍历 effectList 进行执行。

* 函数式组件：执行 useLayoutEffect 回调函数、执行useEffect的销毁函数，再执行useEffect回调函数
* Class 组件：执行componentDidMount 【mount时执行】 、componentDidUpdate 【update 时执行】
* 绑定ref

至此Fiber的工作过程完成。完成一轮 render --> commit 。



## Diff 算法

​		在 render 阶段“递”过程中 beginWork 过程中，对于 update  的组件需要对比该组件上一次更新时生成的Fiber，将比较结果生成新的Fiber。这个过程称为Diff。

​	Fiber 是一个棵树，在两棵树的对比过程中最优的算法时间复杂度也是 O(n^3) 。 React 为了避免diff过程中巨大的开销，指定了三条限制。

+ 只对同一层级DOM进行Diff，如果一个DOM节点在前后两次更新中跨越了层级，那么React 不会尝试复用之前DOM。

+ 两个不同类型的元素会产生两棵不同的树。如果元素由div变成p，那么React 会销毁div及其子孙节点，新建p及其子孙节点。

+ 开发者可以通过key来暗示哪些元素在不同的渲染下能保持稳定。

  ``` react
  // 更新前 DOM
  <div>
    <p key="a">a</p>
    <h3 key="b">###</h3>
  </div>
  
  // 更新后可复用
  <div>
    <h3 key="b">###</h3>
    <p key="a">a</p>
  </div>
  
  ```



### Diff 实现细节

​		针对不同的 jsx 内容 【ClassComponent 是提取render返回的内容、FunctionComponent 则是 函数组件返回的内容】来做判断，判断是单节点、还是多节点。

``` react
function Single (){
  return <div>Single</div>
}

function Muilt(){
  return (
  	<>
    	<div>1</div>
    	<div>2</div>
    </>
  )
};

```





**单节点Diff**

![diff](https://react.iamkasong.com/img/diff.png)

节点是否复用的判定规则：

+ key 相同 && type 相同 的复用
+ key 相同 && type不相同。标记当前Fiber 及其兄弟Fiber 为删除
+ key不相同，将该 Fiber 标记为删除



**多节点 Diff**



























