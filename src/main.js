import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import plugin from './plugin'
console.log(plugin)
// import config from './config';
// import mitt from 'mitt';

const app = createApp(App)

app.config.globalProperties = {
  ...app.config.globalProperties,
  // $config: config,
  // $emitter: mitt(),
}

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.vue$/
)
// console.log(requireComponent.keys())
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  // const componentName = upperFirst(
  //   camelCase(
  //     // 获取和目录深度无关的文件名
  //     fileName
  //       ?.split('/')
  //       ?.pop()
  //       ?.replace(/\.\w+$/, ''),
  //   ),
  // );
  const componentName = fileName
    ?.split('/')
    ?.pop()
    ?.replace(/\.\w+$/, '')
  console.log(`v-${componentName}`)
  // console.log(componentConfig.default);

  // 全局注册组件
  app.component(
    `v-${componentName}`,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

// 自动注册全局组件
// const components = import.meta.globEager('./components/**/*.vue');
// // console.log(components);
// Object.keys(components).forEach(c => {
//   const component = components[c]?.default;
//   app.component(component.name, component);
// });
app.use(plugin.toast)
app.use(router).use(store).mount('#app')
