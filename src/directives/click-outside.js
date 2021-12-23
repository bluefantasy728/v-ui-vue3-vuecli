const ClickOutside = {
  mounted(el, binding) {
    // el.innerHTML = 'hahahahah'
  },
  beforeMount(el, binding) {
    // there could be multiple handlers on the element
    // if (!nodeList.has(el)) {
    //   nodeList.set(el, [])
    // }
    // nodeList.get(el).push({
    //   documentHandler: createDocumentHandler(el, binding),
    //   bindingFn: binding.value,
    // })
  },
  // updated(el, binding) {
  //   if (!nodeList.has(el)) {
  //     nodeList.set(el, [])
  //   }

  //   const handlers = nodeList.get(el)
  //   const oldHandlerIndex = handlers.findIndex(
  //     item => item.bindingFn === binding.oldValue
  //   )
  //   const newHandler = {
  //     documentHandler: createDocumentHandler(el, binding),
  //     bindingFn: binding.value,
  //   }

  //   if (oldHandlerIndex >= 0) {
  //     // replace the old handler to the new handler
  //     handlers.splice(oldHandlerIndex, 1, newHandler)
  //   } else {
  //     handlers.push(newHandler)
  //   }
  // },
  // unmounted(el) {
  //   // remove all listeners when a component unmounted
  //   nodeList.delete(el)
  // },
}

export default ClickOutside
