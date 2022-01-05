<template>
  <div :class="[
      'v-scrollbar',
    ]">
    <div ref="wrapRef" class="v-scrollbar-wrap" @scroll="handleScroll">
      <slot></slot>
    </div>
    <v-scrollbar-bar :move="moveY" :ratio="ratioY" :size="sizeHeight"></v-scrollbar-bar>
  </div>
</template>

<script>
export default {
  name: 'v-scrollbar',
}
</script>
<script setup>
import { ref, onMounted, onUpdated, nextTick } from 'vue'
import vScrollbarBar from './bar.vue'
const props = defineProps({})

const wrapRef = ref(null)
const ratioY = ref(1)
const moveY = ref(0)
const GAP = 4 // scrollbar-bar上下各留了2px空隙
const sizeHeight = ref('0')

const update = async () => {
  if (!wrapRef.value) return
  // if (wrapRef.value.scrollHeight === 0) return

  const offsetHeight = wrapRef.value.offsetHeight - GAP
  // console.log(offsetHeight)

  const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight
  const height = Math.max(originalHeight, 20)
  // console.log(wrapRef.value.scrollHeight)

  ratioY.value =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height))

  // console.log(wrapRef.value)
  // console.log(originalHeight)
  // console.log(offsetHeight - originalHeight)
  // console.log(height / (offsetHeight - height))

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''

  // console.log(sizeHeight.value)
}

const handleScroll = () => {
  if (wrapRef.value) {
    const offsetHeight = wrapRef.value.offsetHeight - GAP
    moveY.value =
      ((wrapRef.value.scrollTop * 100) / offsetHeight) * ratioY.value
    console.log(offsetHeight)
    console.log(ratioY.value)
  }
}

onMounted(() => {
  nextTick(() => update())
})
</script>

<style scoped lang="scss">
@use './scrollbar.scss';
.v-scrollbar {
  display: inline-block;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 200px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.v-scrollbar-wrap {
  overflow: auto;
  height: 100%;
  max-height: 274px;
  width: 100%;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>