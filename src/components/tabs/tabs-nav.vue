<template>
  <div class="v-tabs-nav">
    <slot></slot>
    <div class="v-tabs-shuttle" :style="shuttleStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-nav',
}
</script>
<script setup>
import {
  computed,
  onMounted,
  getCurrentInstance,
  reactive,
  provide,
  inject,
  toRefs,
} from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({})
const selectedName = inject('selectedName')
const state = reactive({
  shuttleStyle: {
    width: 0,
    transform: 'none',
  },
})

const changeSuttlePosition = tabItemVm => {
  const dom = tabItemVm.$el
  const computedStyle = getComputedStyle(dom)
  const paddingLeft = parseInt(computedStyle.paddingLeft)
  const paddingRight = parseInt(computedStyle.paddingRight)
  const width = dom.offsetWidth - paddingLeft - paddingRight
  const left = dom.offsetLeft + paddingLeft
  state.shuttleStyle.transform = `translateX(${left}px)`
  state.shuttleStyle.width = width + 'px'
}

provide('changeSuttlePosition', changeSuttlePosition)

const { shuttleStyle } = toRefs(state)
</script>

<style scoped lang="scss">
@import './tabs-nav.scss';
</style>