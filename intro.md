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

---
