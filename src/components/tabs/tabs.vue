<template>
  <div class="v-tabs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs',
}
</script>
<script setup>
import mitt from 'mitt'
import {
  defineProps,
  computed,
  onMounted,
  getCurrentInstance,
  provide,
} from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({})
const emitter = mitt()

provide('emitter', emitter)
</script>

<style scoped lang="scss">
@use './tabs.scss';
</style>