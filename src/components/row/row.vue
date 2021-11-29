<template>
  <div :class="[
      'v-row',
      `justify-${justify}`
    ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-row',
}
</script>
<script setup>
import { defineProps, provide } from 'vue'
const props = defineProps({
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    default: '',
  },
})
provide('gutter', props.gutter)
</script>

<style scoped lang="scss">
@use './row.scss';
</style>