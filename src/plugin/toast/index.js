import { createApp, createVNode, render } from 'vue'
import Toast from '@/components/toast/toast'
import { toastThemes } from '@/constant/themes'
export default {
  install: app => {
    app.config.globalProperties.$toast = (message, options) => {
      const container = document.createElement('div')
      let node
      console.log(options)
      const component = createApp(Toast, {
        message,
        ...options,
        close: () => {
          console.log('close')
          component.unmount(container)
        },
      })
      component.mount(container)
      // console.log(component)
      node = container.firstElementChild
      document.body.appendChild(node)
    }

    // console.log(toastThemes);
    toastThemes.forEach(theme => {
      app.config.globalProperties.$toast[theme] = (message, options) => {
        app.config.globalProperties.$toast(message, { ...options, type: theme })
      }
    })
  },
}
let $inst
// 创建挂载实例
let createMount = opts => {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const app = createApp(PopupConstructor, {
    ...opts,
    modelValue: true,
    remove() {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    },
  })
  return app.mount(mountNode)
}

function V3Popup(options = {}) {
  options.id = options.id || 'v3popup_' + generateId()
  $inst = createMount(options)
  return $inst
}

V3Popup.install = app => {
  app.component('v3-popup', PopupConstructor)
  // app.config.globalProperties.$v3popup = V3Popup
  app.provide('v3popup', V3Popup)
}
