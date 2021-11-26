<template>
  <div :class="[
    'v-input',
    {
      'is-disabled':disabled
    }
  ]">
    <input class="v-input-inner" type="text" @input="onChange" :disabled="disabled" />
    <div v-if="errorMessage" class="error-message"></div>
  </div>
</template>
<script>
export default {
  name: 'v-input',
};
</script>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update']);

function onChange(e) {
  emit('update:modelValue', e.target.value);
}
</script>

<style scoped lang="scss">
@use 'input.scss';
</style>