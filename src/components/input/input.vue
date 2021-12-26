<template>
  <div :class="[
    'v-input',
    {
      'is-disabled':disabled
    }
  ]">
    <input
      class="v-input-inner"
      :value="modelValue"
      type="text"
      @input="onChange"
      :disabled="disabled"
      :readonly="readonly"
    />
    <div v-if="errorMessage" class="error-message"></div>
    <div class="right-slot">
      <slot name="right-slot"></slot>
    </div>
    <!-- <v-icon v-if="clearable" class="close-icon" name="close" @click.self="clear"></v-icon> -->
  </div>
</template>
<script>
export default {
  name: 'v-input',
}
</script>
<script setup>
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
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'clear'])

function onChange(e) {
  emit('update:modelValue', e.target.value)
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style scoped lang="scss">
@use 'input.scss';
</style>