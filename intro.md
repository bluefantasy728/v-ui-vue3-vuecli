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
