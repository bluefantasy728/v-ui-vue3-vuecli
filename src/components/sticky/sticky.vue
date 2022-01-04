<template>
  <div ref="wrapperRef" :class="[
    'v-sticky',
    {
      'is-sticky':top<0
    }
  ]">
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'

const wrapperRef = ref(null)
const position = reactive({
  top: 0,
  left: 0,
})

onMounted(() => {
  const { top, left } = wrapperRef.value.getBoundingClientRect()
  position.top = top
  position.left = left

  window.addEventListener(
    'scroll',
    () => {
      console.log('top', top.value)
    },
    false
  )
})
</script>

<script>
export default {
  name: 'v-sticky',
}
</script>

<style scoped lang="scss">
</style>