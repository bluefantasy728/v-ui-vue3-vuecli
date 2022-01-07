<template>
  <teleport to="body">
    <transition name="slidedown">
      <div
        v-show="isOpen"
        ref="popperRef"
        class="v-popper"
        :style="popperStyle"
        v-click-outside="close"
      >
        <slot></slot>
        <div class="popper-arrow" :style="popperArrowStyle"></div>
      </div>
    </transition>
  </teleport>
</template>
<script>
export default {
  name: 'v-popper',
}
</script>
<script setup>
import { ref, onMounted, inject, provide, watch } from 'vue'
import mitt from 'mitt'
import usePopper from '@/hooks/usePopper'
import vClickOutside from '@/directives/click-outside'
const { popperStyle, setPopoverStyle, popperArrowStyle } = usePopper()
const emitter = mitt()
provide('emitter', emitter)
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

const triggerRef = inject('triggerRef')
const isOpen = inject('isOpen')
const setIsOpen = inject('setIsOpen')

const close = () => {
  setIsOpen(false)
}
// 给这个方法绑定上触发元素，方便在click-outside指令里拿到并使用
close.triggerRef = triggerRef

onMounted(() => {
  setPopoverStyle(triggerRef.value.$el)
})

watch(isOpen, val => {
  if (val) {
    emitter.emit('showScrollbar')
  }
})
</script>

<style scoped lang="scss">
@import 'popper.scss';
.slidedown-enter-active {
  animation: slide-down 0.3s;
}
.slidedown-leave-active {
  animation: slide-down 0.3s reverse;
}
@keyframes slide-down {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>