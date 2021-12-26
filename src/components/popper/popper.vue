<template>
  <teleport to="body">
    <div
      v-show="isOpen"
      ref="popperRef"
      class="v-popper"
      :style="popperStyle"
      v-click-outside="close"
    >
      <slot></slot>
      <!-- <div class="test"></div> -->
      <div class="popper-arrow" :style="popperArrowStyle"></div>
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
import vClickOutside from '@/directives/click-outside'
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

const triggerRef = inject('triggerRef')
const isOpen = inject('isOpen')
const setIsOpen = inject('setIsOpen')

const open = () => {
  setIsOpen(true)
}
const close = () => {
  setIsOpen(false)
}
close.triggerRef = triggerRef

onMounted(() => {
  setPopoverStyle(triggerRef.value.$el)
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