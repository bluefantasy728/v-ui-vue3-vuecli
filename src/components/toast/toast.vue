<template>
  <div class="v-toast">
    <!-- <div class="v-toast-text">{{message}}</div> -->
    <slot name="test"></slot>
  </div>
</template>

<script>
export default {
  name: 'v-toast',
}
</script>
<script setup>
import {
  defineProps,
  provide,
  computed,
  onMounted,
  getCurrentInstance,
} from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 3000,
  },
})
const { close } = proxy.$attrs
onMounted(() => {
  setTimeout(() => {
    close()
  }, props.duration)
})
</script>

<style scoped lang="scss">
// @use './toast.scss';
.v-toast {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 46px;
  background: pink;
  color: #000;
}
</style>