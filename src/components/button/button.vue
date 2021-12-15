<template>
  <button
    :class="[
      'v-button',
      type ? `v-button--${type}` : '',
      {
        'is-disabled':disabled,
        'is-loading':loading
      }
    ]"
    :disabled="disabled"
  >
    <v-icon v-if="loading" class="left-icon loading-icon" name="loading"></v-icon>
    <v-icon v-if="icon" class="left-icon" :name="icon"></v-icon>
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  icon: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<script>
import vIcon from '@/components/icon/icon.vue'
export default {
  name: 'v-button',
  components: { vIcon },
}
</script>

<style scoped lang="scss">
@use 'button.scss';
</style>