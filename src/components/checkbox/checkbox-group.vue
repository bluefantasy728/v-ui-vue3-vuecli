<template>
  <div class="v-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-checkbox-group',
}
</script>
<script setup>
import { ref, provide, computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'change'])
const selected = computed(() => props.modelValue)

function change(val) {
  selected.value = val
  emit('update:modelValue', val)
  emit('change', val)
}

provide('selected', selected)
provide('change', change)
provide('isInGroup', true)
</script>


<style scoped lang="scss">
.v-checkbox-group {
  display: inline-block;
  vertical-align: middle;
  :deep(.v-checkbox) {
    margin-right: 20px;
    &:nth-last-of-type(1) {
      margin-right: 0;
    }
  }
}
</style>