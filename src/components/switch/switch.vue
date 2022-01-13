<template>
  <div class="v-switch" @click="change">
    <div :class="[
      'v-switch-inner',
      {
        'is-active':modelValue
      }
    ]"></div>
  </div>
</template>

<script>
export default {
  name: 'v-switch',
}
</script>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

function change() {
  emit('update:modelValue', !props.modelValue)
}
</script>


<style scoped lang="scss">
@import './switch';
</style>