<template>
  <div
    :class="[
      'v-checkbox',
      {
        'is-checked':isChecked,
        'is-indeterminate':indeterminate
      }
    ]"
    @click="handleClick"
  >
    <span class="v-checkbox-input">
      <v-icon :name="indeterminate?'minus':'check'"></v-icon>
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
import { inject, computed } from 'vue'
import vIcon from '@/components/icon/icon.vue'
const props = defineProps({
  value: {
    type: [Number, String, Boolean],
    // required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selected = inject('selected', null)
const change = inject('change', () => {})
const isInGroup = inject('isInGroup', false) // 是否被checkbox-group组件包裹

const isChecked = computed(() => {
  if (isInGroup) {
    return selected.value.includes(props.value)
  } else {
    return props.modelValue || props.value
  }
})

function handleClick() {
  if (isInGroup) {
    const res = [...selected.value]
    const index = res.indexOf(props.value)
    if (index < 0) {
      res.push(props.value)
    } else {
      res.splice(index, 1)
    }
    change(res)
  } else {
    // console.log(props.modelValue)
    emit('update:modelValue', !props.modelValue)
    emit('change', !props.modelValue)
  }
}
</script>
<style scoped lang="scss">
@import './checkbox.scss';
</style>