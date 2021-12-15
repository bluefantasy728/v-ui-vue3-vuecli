<template>
  <transition name="fade" mode="out-in" appear>
    <div :class="[
      'v-toast',
      `v-toast-${type}`,
      `v-toast-${position}`
    ]">
      <div class="v-toast-text">{{message}}</div>
      <v-icon name="loading" class="close-icon" @click="close"></v-icon>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'v-toast',
}
</script>
<script setup>
import { provide, computed, onMounted, getCurrentInstance } from 'vue'
import vIcon from '@/components/icon/icon'

const { proxy } = getCurrentInstance()
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'top',
  },
})
const { close } = proxy.$attrs
onMounted(() => {
  if (props.autoClose) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style scoped lang="scss">
@use './toast.scss';
</style>