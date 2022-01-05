<template>
  <div ref="wrapperRef" class="v-sticky" :style="wrapperStyle">
    <div
      :class="[
    'v-sticky-inner',
    {
      'is-sticky':isSticky
    }
  ]"
      :style="innerStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch } from 'vue'

const props = defineProps({
  distance: {
    type: [String, Number],
    default: 0,
  },
})

const wrapperRef = ref(null)
const position = reactive({
  top: 0,
  left: 0,
})

const wrapperStyle = reactive({
  height: '',
})
const innerStyle = reactive({
  left: '',
  top: '',
  width: '',
  height: '',
})

const distanceTop = computed(() => parseInt(props.distance))

const isSticky = ref(false)

watch(isSticky, val => {
  if (val) {
    const { height, width } = wrapperRef.value.getBoundingClientRect()
    setStyle(height, width, distanceTop.value)
  }
})

function setStyle(height, width, top) {
  wrapperStyle.height = height + 'px'
  innerStyle.width = width + 'px'
  innerStyle.top = top + 'px'
}

function onScrollHandler() {
  const { top, left } = wrapperRef.value.getBoundingClientRect()
  position.top = top
  position.left = left + window.scrollX

  isSticky.value = top < distanceTop.value
}

onMounted(() => {
  window.addEventListener('scroll', onScrollHandler, false)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollHandler, false)
})
</script>

<script>
export default {
  name: 'v-sticky',
}
</script>

<style scoped lang="scss">
.v-sticky-inner {
  &.is-sticky {
    position: fixed;
    top: 0;
  }
}
</style>