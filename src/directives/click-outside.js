const cbs = []
const handleClick = e => {
  cbs.forEach(item => {
    const fn = item.cb
    const triggerRef = fn.triggerRef
    const target = e.target
    if (
      item.el === target ||
      item.el.contains(target) ||
      triggerRef.value.$el.contains(target)
    )
      return
    item.cb()
  })
}
document.addEventListener('click', handleClick)

const ClickOutside = {
  mounted(el, binding) {
    cbs.push({
      el,
      cb: binding.value,
    })
  },
  unmounted(el) {},
}

export default ClickOutside
