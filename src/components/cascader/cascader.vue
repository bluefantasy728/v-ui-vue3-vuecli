<template>
  <div :class="[
      'v-cascader',
    ]" v-click-outside="close">
    <v-input v-model="labelList" @click="open"></v-input>
    <div class="v-cascader-wrapper" v-if="isOpen">
      <v-cascader-item :options="options"></v-cascader-item>
    </div>
  </div>
</template>
<script setup>
import { provide, ref, reactive, onMounted, toRefs, computed } from 'vue'
import vClickOutside from '@/directives/click-outside'
import cloneDeep from 'lodash.clonedeep'
const props = defineProps({
  modelValue: {
    type: Array,
  },
  options: {
    type: Array,
  },
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const close = () => {
  isOpen.value = false
}
const open = () => {
  isOpen.value = true
}

const state = reactive({
  selected: cloneDeep(props.modelValue),
})

const selectNode = (level, value, isLast) => {
  state.selected[level] = value
  isLast && emit('update:modelValue', cloneDeep(state.selected))
}

provide('selected', state.selected)
provide('selectNode', selectNode)

const labelList = computed(() => {
  const arr = []
  let obj = {}
  let list = props.options
  state.selected.forEach((item, index) => {
    if (!list) return
    obj = list.find(optionItem => optionItem.value === item)
    if (obj) {
      arr[index] = obj.label
      list = obj.children
    }
  })
  return arr.join('/')
})

const { selected } = toRefs(state)
</script>

<script>
export default {
  name: 'v-cascader',
}
</script>

<style scoped lang="scss">
@use 'cascader.scss';
.v-cascader {
  position: relative;
  // height: 40px;
  // width: 150px;
  background: #eee;
  display: inline-block;
}
.v-cascader-wrapper {
  position: absolute;
  left: 0;
  top: 100%;
}
</style>