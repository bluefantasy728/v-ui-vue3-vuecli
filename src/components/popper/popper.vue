<template>
  <teleport to="body">
    <div v-show="isVisible" ref="popperRef" class="v-popper" :style="popperStyle">
      <slot></slot>
      <!-- <div class="test"></div> -->
      <!-- <div class="popper-arrow" :style="popperArrowStyle"></div> -->
    </div>
  </teleport>
</template>
<script>
export default {
  name: 'v-popper',
}
</script>
<script setup>
import { ref, onMounted, inject } from 'vue'
import usePopper from '@/hooks/usePopper'
const { popperStyle, setPopoverStyle, popperArrowStyle } = usePopper()
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const popperRef = ref(null)
const isVisible = ref(false)

const wrapRef = inject('wrapRef')

console.log(wrapRef)

onMounted(() => {
  setPopoverStyle(wrapRef.value)
})
</script>

<style scoped lang="scss">
@use 'popper.scss';
.test {
  width: 200px;
  height: 200px;
  background: pink;
}
</style>