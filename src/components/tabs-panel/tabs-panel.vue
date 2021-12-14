<template>
  <div class="v-tabs-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-panel',
}
</script>
<script setup>
import mitt from 'mitt'
import {
  defineProps,
  computed,
  onMounted,
  getCurrentInstance,
  inject,
} from 'vue'
const emitter = inject('emitter')

const { proxy } = getCurrentInstance()
const props = defineProps({})

emitter.on('onSelect', name => {
  console.log(name)
})
</script>

<style scoped lang="scss">
@use './tabs-panel.scss';
</style>