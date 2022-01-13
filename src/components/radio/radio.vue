<template>
  <label
    :class="[
      'v-radio',
      {
        'is-checked':props.value===selected
      }
    ]"
    @click="handleClick"
  >
    <span class="v-radio-input"></span>
    <span class="v-radio-label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'v-radio',
}
</script>
<script setup>
import { inject } from 'vue'
const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
})
const selected = inject('selected')
const change = inject('change')

function handleClick() {
  change(props.value)
}
</script>
<style scoped lang="scss">
@import './radio';
</style>