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
  ref,
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
const active = computed(() => selectedName.value === props.name)

const onClick = () => {
  changeName(props.name)
  changeSuttlePosition(proxy)
}

onMounted(() => {
  if (selectedName.value === props.name) {
    onClick()
  }
})
</script>

<style scoped lang="scss">
@import './tabs-item.scss';
</style>