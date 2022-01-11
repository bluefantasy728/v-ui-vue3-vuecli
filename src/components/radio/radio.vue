<template>
  <label class="v-radio" @click="handleClick">
    <span
      :class="[
      'v-radio-input',
      {
        'is-checked':props.value===selected
      }
    ]"
    ></span>
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
.v-radio {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  .v-radio-input {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid $border-color-base;
    margin-right: 12px;
    &:hover {
      border: 1px solid $color-primary;
    }
    &.is-checked {
      border: 1px solid $color-primary;
      background-color: $color-primary;
    }
    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
    }
  }
  .v-radio-label {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>