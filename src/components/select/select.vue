<template>
  <div class="v-select" ref="selectRef">
    <v-input ref="inputRef"></v-input>
    <v-popper ref="popperRef">
      <ul class="v-select-option-wrap">
        <li class="v-select-option-item" v-for="(item,index) in options" :key="index">{{item.label}}</li>
      </ul>
    </v-popper>
  </div>
</template>
<script>
export default {
  name: 'v-select',
}
</script>
<script setup>
import { ref, onMounted, provide } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])
const selectRef = ref(null)
// const inputRef = ref(null)
// const popperRef = ref(null)
provide('wrapRef', selectRef)
</script>

<style scoped lang="scss">
@use 'select.scss';
.v-select {
  display: inline-block;
}
</style>