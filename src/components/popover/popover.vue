<template>
  <div class="v-popover" ref="popoverRef">
    <span
      class="v-popover-trigger"
      ref="popoverTriggerRef"
      @click="onClick"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="trigger">
        <v-button>点击弹出</v-button>
      </slot>
    </span>
    <teleport to="body">
      <div
        v-show="isVisible"
        ref="popoverContentRef"
        class="v-popover-content"
        :style="popperStyle"
      >
        <slot></slot>
        <div class="popper-arrow" :style="popperArrowStyle"></div>
      </div>
    </teleport>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import usePopover from './usePopover'
const { popperStyle, setPopoverStyle, popperArrowStyle } = usePopover()
const props = defineProps({
  trigger: {
    type: String,
    default: 'click',
  },
})
const popoverRef = ref(null)
const popoverTriggerRef = ref(null)
const popoverContentRef = ref(null)
const isVisible = ref(false)

const onclickDocument = ev => {
  // 如果点击document的时候点击到的是content区域，那就什么都不做
  if (popoverContentRef.value.contains(ev.target)) {
    return
  }
  close()
}

const close = () => {
  isVisible.value = false
  document.removeEventListener('click', onclickDocument, false)
}
const show = () => {
  isVisible.value = true
  setTimeout(() => {
    document.addEventListener('click', onclickDocument, false)
  }, 0)
}
const onClick = () => {
  if (props.trigger !== 'click') return
  if (isVisible.value) {
    close()
  } else {
    show()
  }
}

const onMouseEnter = () => {
  if (props.trigger !== 'hover') return
  isVisible.value = true
}
const onMouseLeave = () => {
  if (props.trigger !== 'hover') return
  isVisible.value = false
}

onMounted(() => {
  setPopoverStyle(popoverRef, popoverTriggerRef)
})
</script>

<script>
import vButton from '@/components/button/button.vue'
export default {
  name: 'v-popover',
  components: { vButton },
}
</script>

<style scoped lang="scss">
@use 'popover.scss';
</style>