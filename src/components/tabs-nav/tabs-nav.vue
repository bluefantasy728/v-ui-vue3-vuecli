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
const state = reactive({
  shuttleStyle: {
    width: 0,
    transform: 'none',
  },
})

const changeSuttlePosition = tabItemVm => {
  console.log(tabItemVm)
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
@use './tabs-nav.scss';
@import '../../style/index.scss';
.v-tabs-nav {
  display: flex;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
  }
  .v-tabs-shuttle {
    position: absolute;
    height: 2px;
    background: $color-primary;
    width: 100px;
    left: 0;
    bottom: 0px;
    transition: transform 0.2s;
    z-index: 2;
  }
}
</style>