<template>
  <div :class="[
    'v-collapse',
  ]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'v-collapse',
}
</script>
<script setup>
import { ref, provide } from 'vue'
const props = defineProps({
  selected: {
    type: [String, Array],
    required: true,
  },
  isSingle: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:selected'])
const selected = ref(props.selected)
const changeSelected = name => {
  console.log(name)
  selected.value = name
  emit('update:selected', name)
}
const isSingle = ref(props.isSingle)
provide('selected', selected)
provide('changeSelected', changeSelected)
provide('isSingle', isSingle)
</script>

<style scoped lang="scss">
@use 'collapse.scss';
</style>