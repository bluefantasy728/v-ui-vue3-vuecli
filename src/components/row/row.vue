<template>
  <div
    :class="[
      'v-row',
      justify && `justify-${justify}`,
      align && `align-${align}`
    ]"
    :style="rowStyle"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-row',
}
</script>
<script setup>
import { provide, computed } from 'vue'
const props = defineProps({
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    default: '',
  },
  align: {
    type: String,
    default: '',
  },
})
const rowStyle = computed(() => ({
  marginLeft: -props.gutter / 2 + 'px',
  marginRight: -props.gutter / 2 + 'px',
}))
provide('gutter', props.gutter)
</script>

<style scoped lang="scss">
@use './row.scss';
</style>