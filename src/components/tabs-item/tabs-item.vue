<template>
  <div class="v-tabs-item" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-item',
}
</script>
<script setup>
import {
  defineProps,
  computed,
  onMounted,
  getCurrentInstance,
  inject,
} from 'vue'
const emitter = inject('emitter')
const { proxy } = getCurrentInstance()
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const onClick = () => {
  // console.log(props.name)
  emitter.emit('onSelect', { name: props.name, vm: proxy })
}
</script>

<style scoped lang="scss">
@use './tabs-item.scss';
@import '../../style/index.scss';
.v-tabs-item {
  font-weight: 500;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  &:nth-of-type(1) {
    padding-left: 0;
  }
  &:nth-last-of-type(1) {
    padding-right: 0;
  }
  &:hover {
    color: $color-primary;
  }
}
</style>