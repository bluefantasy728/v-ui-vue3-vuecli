## button

单元测试的时候加入 icon，就报警告

```
 [Vue warn]: Failed to resolve component: v-icon
  If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
    at <VButton type="primary" ref="VTU_COMPONENT" >
    at <VTUROOT>
```

就是如果要引入 icon，似乎并没有注册 v-icon 组件
发现了解决办法，因为项目本身 main.js 里有自动导入并注册组件的，可能是因为测试文件的时候不会自动导入，所以再 button.vue 组件里再次导入一次 vIcon 组件就不会报错了

---

## tabs

一共有 5 个组件对应
`v-tabs, v-tabs-nav, v-tabs-item, v-tabs-content, v-tabs-panel`
因为 Vue3 已经取消了 Vue 实例上的 EventBus 功能，推荐使用第三方的 mitt 包，为了 tabs 里的其他组件都能共享一个 emmiter，所以在最顶层 Tabs 组件中创建 mitt 实例

```javascript
cont emitter = mitt()
```

然后通过 provide 传递给下面的其他组件，通过`inject`导入

每个 tabs-item 点击后都触发 emitter 的 onSelect 事件，传入 name，另外每个 tabs-item 也同时监听 onSelect 事件，发现触发的 name 如果和自身 props 里的 name 一样时，自己就加上 active class 显示高亮

每次 tabs 本身也监听 onSelect 事件，同时通过 defineEmits 里去触发外部调用组件的 change 事件

vue3 取消了$children，不能直接拿子组件里的各种方法和 data 了，可以在子组件上用 ref，然后子组件里面通过 defineExport 把想要暴露给父组件的内容暴露出去
另外，如果子组件是通过 slot 传的，要拿子组件的数据就有点麻烦了，要不通过 mitt，父组件监听，子组件触发。如果想拿到子组件实例，可以通过 provide
https://www.jianshu.com/p/a777d61ce10d

发现 provide 其实可以直接传方法的，所以在最上层的 tabs 组件中将改变 selected 值得方法放到 provide 里传递到下面所有的子孙组件，点击某个 tab-item 的时候就调这个方法
另外，`v-model:selected` 可以实现双向绑定的同时也定义了 props 的名称是 selected。然后声明 emit 的时候加入前缀`update:`

```
const emit = defineEmits(['update:selected'])
emit('update:selected', name)
```

---

## Popper

这个组件可以归纳为一切需要插入到 body 标签中，但是位置又和触发标签位置相关的组件，比如 select，popover 等，他们的共同点，都是点击或者 hover 某个按钮，然后在这个 node 的附近把这个容器显示出来。看了下 element 的源码，应该是在元素使用的时候就把这个对应的容器也一起插入到了 body 中，样式(left,top 值)会初始化，但是不会显示出来

- 确定这个容器的 top 和 left 值：
  最常用的做法，是将这个容器定义为 position:absolute，然后插入到 body 中。那关键的知识点为：获取触发节点的距离页面顶部的距离和页面左边的距离，注意因为页面本身是超过整个屏幕高度的，所以除了那个`getBoundingClientRect`的 top 之外，还要加上`window.scrollY`，这个 scrollY 就是目前窗口往上滚动超过屏幕的距离，scrollX 同理。至于如何插入到
- 如何插入这个元素？其实 vue3 支持 teleport 标签，可以轻松实现在 body 上插入
- 如何保证在点击这个元素外面的地方可以让它消失，但是点击在这个元素的内部不能让它消失？这里可以使用 directive 的功能，自定义指令的一个重要的功能，就是可以在只写标签的情况下，对这个标签进行一些在不同生命周期中做一些 DOM 操作，在 popper 组件中用到了 click-out 这个指令
- 通过 transition 给 popper 显示的时候加入渐入渐出动画

---

## ScrollBar

在 select 组件里的下拉框使用了 Popper，里面嵌套了 scrollbar 组件。

- 难点在于里面的 bar 组件，首先要通过 css 隐藏原生的滚动条，再创建自定义的滚动条组件，这个滚动条组件没有实现点击移动功能，只能随着鼠标滚动而滚动，里面包括了滚动条的位置定位还有高度设置。
- 在与 popper 组件配合的时候，需要 popper 组件 provide 一个 mitt 对象，通知 scrollbar 要显示了，然后计算 scrollbar 的高度再赋值滚动条的高度。
- 但是 scrollbar 未必上层都会套在 popper 组件里，所以 inject 这个 mitt 对象的时候要加入一个默认值，否则 vue 会抛警告

```
const emitter = inject('emitter', null)
```

---

## Sticky

吸顶组件，通过监听页面滚动，不断判断目标元素具体窗口顶部的距离，如果小于一定值，就 fixed 定位
有几点注意

- slot 外层还要再加一层元素，然后监听到一旦需要变成 stikcy 状态，需要给这个元素加上 fixed，然后给最外层元素加上 width,height 的样式，目的是为了占位，因为一旦给组件外层元素变成 fixed 之后就脱离了文档流，下面的元素会突然网上顶。为了避免这个情况，就需要在变化状态的时候给外层手动加入包裹元素的样式

---

## Upload 上传

- 使用 XMLHttpRequest 实例以及 FormData 实现上传
- 创建一个 type=file 的 input，然后模拟点击这个 input 选择文件
- 然后给这个 input 绑定上 change 事件实现上传操作
- 拖拽上传，只要给容器添加 drop,dragover,dragleave 事件就行，3 个事件都通过.prevent 来阻止默认事件，然后把主要逻辑写在 drop 里，通过事件对象获取到鼠标放开时拖进去的文件对象`const file = e.dataTransfer.files[0]`。

---

## Pager 分页

- 关键问题是对当前页码 current 的控制
- 当总页数少于 8 时，展示完整的分页器；如果大于等于 8，根据不同 current，要展示不同的页码以及省略号
- 点击省略号也可以让 current 往前或者往后跳 5 格
