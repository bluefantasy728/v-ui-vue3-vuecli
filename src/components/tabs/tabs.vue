<template>
  <div class="v-tabs">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs',
}
</script>
<script setup>
import mitt from 'mitt'
import {
  ref,
  computed,
  onMounted,
  getCurrentInstance,
  provide,
  useSlots,
} from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({
  selected: {
    type: [String, Number],
    default: '',
  },
})
const emitter = mitt()
provide('emitter', emitter)

// 收集组件下面所有tabItem的vm实例
const tabItemVms = ref([])
provide('tabItemVms', tabItemVms)

const emit = defineEmits(['change'])

emitter.on('onSelect', ({ name }) => {
  emit('change', name)
})

onMounted(() => {
  const tab = tabItemVms.value.find(vm => vm.name === props.selected)
  emitter.emit('onSelect', { name: 'info', vm: tab })
})
</script>

<style scoped lang="scss">
@use './tabs.scss';
// .v-tabs {
// }
</style>