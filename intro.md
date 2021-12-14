## tabs

一共有 5 个组件对应
`v-tabs, v-tabs-nav, v-tabs-item, v-tabs-content, v-tabs-panel`
因为 Vue3 已经取消了 Vue 实例上的 EventBus 功能，推荐使用第三方的 mitt 包，为了 tabs 里的其他组件都能共享一个 emmiter，所以在最顶层 Tabs 组件中创建 mitt 实例

```javascript
cont emitter = mitt()
```

然后通过 provide 传递给下面的其他组件，通过`inject`导入

---
