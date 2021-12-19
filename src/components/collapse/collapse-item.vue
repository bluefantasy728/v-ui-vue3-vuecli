<template>
  <div class="v-collapse-item">
    <div class="v-collapse-title" @click="onClickTitle">{{title}}</div>
    <div class="v-collapse-content" v-if="isOpen">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-collapse-item',
}
</script>
<script setup>
import { inject, ref, computed } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})

const selected = inject('selected')
const changeSelected = inject('changeSelected')
const isSingle = inject('isSingle')

const isOpen = computed(() => {
  if (isSingle.value) {
    return props.name === selected.value
  } else {
    return selected.value.includes(props.name)
  }
})

const onClickTitle = () => {
  const _isOpen = isOpen.value
  const _isSingle = isSingle.value
  const _selected = selected.value
  if (_isSingle) {
    changeSelected(_isOpen ? '' : props.name)
  } else {
    const index = _selected.indexOf(props.name)
    index < 0 ? _selected.push(props.name) : _selected.splice(index, 1)
    changeSelected(_selected)
  }
}
</script>

<style scoped lang="scss">
@use 'collapse-item.scss';
@import '../../style/index.scss';
.v-collapse-item {
  .v-collapse-title {
    padding: 10px;
    cursor: pointer;
  }
  .v-collapse-content {
    padding: 10px;
  }
  border-bottom: 1px solid $color-text-placeholder;
  &:nth-last-of-type(1) {
    border-bottom: none;
  }
}
</style>