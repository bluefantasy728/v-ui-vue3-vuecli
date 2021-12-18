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
    type: [String, Number],
    default: '',
  },
})

const selected = inject('selected')
const changeSelected = inject('changeSelected')
const isSingle = inject('isSingle')

const isOpen = computed(() => {
  if (isSingle) {
    return props.name === selected.value
  } else {
    return selected.value.includes(props.name)
  }
})

const onClickTitle = () => {
  if (isOpen.value) {
    console.log(selected.value)
    changeSelected('')
  } else {
    changeSelected(props.name)
    console.log(selected.value)
  }
  if (isSingle) {
    // isOpen.value = !isOpen.value
  } else {
  }
  // if (isOpen.value) {
  //   changeSelected(props.name)
  // } else {
  //   changeSelected('')
  // }
  // isOpen.value = !isOpen.value
  // if (isSingle && props.name !== selectedName) {
  //   isOpen.value = false
  // }
}
</script>

<style scoped lang="scss">
@use 'collapse-item.scss';
.v-collapse-item {
  .v-collapse-title {
    padding: 10px;
    cursor: pointer;
  }
  .v-collapse-content {
    padding: 10px;
  }
}
</style>