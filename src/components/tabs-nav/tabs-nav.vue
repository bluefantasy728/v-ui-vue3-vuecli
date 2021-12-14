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
  defineProps,
  computed,
  onMounted,
  getCurrentInstance,
  reactive,
  inject,
  toRefs,
} from 'vue'
const emitter = inject('emitter')

const { proxy } = getCurrentInstance()
const props = defineProps({})
const state = reactive({
  shuttleStyle: {
    width: 0,
    transform: 'none',
  },
})

emitter.on('onSelect', ({ name, vm }) => {
  const dom = vm.$el
  const computedStyle = getComputedStyle(dom)
  const paddingLeft = parseInt(computedStyle.paddingLeft)
  const paddingRight = parseInt(computedStyle.paddingRight)
  const width = dom.offsetWidth - paddingLeft - paddingRight
  const left = dom.offsetLeft + paddingLeft
  state.shuttleStyle.transform = `translateX(${left}px)`
  state.shuttleStyle.width = width + 'px'
})

onMounted(() => {
  // console.log(proxy.$slots.default())
})

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