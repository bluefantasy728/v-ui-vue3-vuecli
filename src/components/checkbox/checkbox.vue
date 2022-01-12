<template>
  <div class="v-checkbox" @click="handleClick">
    <span
      :class="[
        'v-checkbox-input',
        {
          'is-checked':selected.includes(props.value)
        }
      ]"
    >
      <v-icon name="check"></v-icon>
    </span>
    <span class="v-checkbox-label">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'v-checkbox',
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
  const res = [...selected.value]
  const index = res.indexOf(props.value)
  if (index < 0) {
    res.push(props.value)
  } else {
    res.splice(index, 1)
  }
  change(res)
}
</script>
<style scoped lang="scss">
.v-checkbox {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    .v-checkbox-input {
      &::after {
        opacity: 1;
      }
    }
  }
  .v-checkbox-input {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    border: 1px solid $border-color-base;
    margin-right: 12px;
    background: #fff;
    transform-style: preserve-3d;
    &:hover {
      border: 1px solid $color-primary;
    }
    &.is-checked {
      border: 1px solid $color-primary;
      background-color: $color-primary;
    }
    .v-icon {
      fill: #fff;
      margin-top: -7px;
    }
    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, -1px);
      transition: 0.2s opacity;
      background-color: #eee;
      opacity: 0;
    }
  }
  .v-checkbox-label {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>