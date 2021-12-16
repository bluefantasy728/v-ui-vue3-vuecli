<template>
  <div class="v-tabs-panel" v-if="selectedName === name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-panel',
}
</script>
<script setup>
import {
  computed,
  onMounted,
  getCurrentInstance,
  reactive,
  toRefs,
  inject,
} from 'vue'
const selectedName = inject('selectedName')

const { proxy } = getCurrentInstance()
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
@use './tabs-panel.scss';
</style>