<template>
  <div ref="barRef" :class="[
      'v-scrollbar-bar',
  ]">
    <div ref="thumbRef" class="v-scrollbar-thumb" :style="thumbStyle" @click="clickThumbHandler"></div>
  </div>
</template>

<script>
export default {
  name: 'v-scrollbar-bar',
}
</script>
<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  move: Number,
  ratio: Number,
  size: String,
})

const barRef = ref(null)
const thumbRef = ref(null)

const offsetRatio = computed(() => barRef.value.offsetHeight)

const thumbStyle = computed(() => ({
  transform: `translateY(${props.move}%)`,
  height: props.size,
}))

const clickThumbHandler = e => {}
</script>

<style scoped lang="scss">
@use './bar.scss';
@import '../../style/index.scss';
.v-scrollbar-bar {
  position: absolute;
  right: 2px;
  top: 2px;
  bottom: 2px;
  height: 100%;
  width: 6px;
  border-radius: 4px;
  opacity: 0.3;
  .v-scrollbar-thumb {
    position: relative;
    display: block;
    width: 100%;
    height: 50px;
    cursor: pointer;
    border-radius: inherit;
    background-color: $color-text-secondary;
    transition: 0.3s background-color, 0.3s opacity;
    opacity: 0.3;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>