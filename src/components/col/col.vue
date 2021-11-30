<template>
  <div :class="[
    'v-col',
    `v-col-${span}`
  ]" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-col',
}
</script>
<script setup>
import { defineProps, inject } from 'vue'
const props = defineProps({
  span: {
    type: Number,
    default: 1,
  },
  offset: {
    type: Number,
    default: 0,
  },
})
const gutter = inject('gutter')
const colStyle = {
  marginLeft: gutter / 2 + props.offset + 'px',
  marginRight: gutter / 2 + 'px',
}
</script>

<style scoped lang="scss">
@import '../../style/index.scss';
.v-col {
  @for $i from 1 through 24 {
    &.v-col-#{$i} {
      width: (($i / 24) * 100) * 1%;
    }
  }
}
</style>