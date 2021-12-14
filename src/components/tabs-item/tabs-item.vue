<template>
  <div class="v-tabs-item" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-item',
}
</script>
<script setup>
import {
  defineProps,
  computed,
  onMounted,
  getCurrentInstance,
  inject,
} from 'vue'
const emitter = inject('emitter')
const { proxy } = getCurrentInstance()
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const onClick = () => {
  console.log(props.name)
  emitter.emit('onSelect', props.name)
}
</script>

<style scoped lang="scss">
@use './tabs-item.scss';
</style>