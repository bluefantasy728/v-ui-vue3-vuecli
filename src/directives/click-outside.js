const cbs = []
const handleClick = e => {
  cbs.forEach(item => {
    if (item.el === e.target || item.el.contains(e.target)) return
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
