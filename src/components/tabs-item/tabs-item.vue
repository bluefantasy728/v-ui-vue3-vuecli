<template>
  <div :class="[
    'v-tabs-item',
    {
      active,
    }
  ]" @click="onClick">
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
  computed,
  onMounted,
  getCurrentInstance,
  inject,
  reactive,
  toRefs,
} from 'vue'
const changeSuttlePosition = inject('changeSuttlePosition')
const selectedName = inject('selectedName')
const changeName = inject('changeName')

const { proxy } = getCurrentInstance()
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})
const state = reactive({
  active: false,
})
const active = computed(() => selectedName === props.name)

const onClick = () => {
  changeName(props.name)
  changeSuttlePosition(proxy)
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
  &:hover,
  &.active {
    color: $color-primary;
  }
}
</style>