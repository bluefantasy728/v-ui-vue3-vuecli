<template>
  <div class="v-tabs-panel" v-if="selectedName === name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-panel',
}
</script>
<script setup>
import {
  computed,
  onMounted,
  getCurrentInstance,
  reactive,
  toRefs,
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

const state = reactive({
  selectedName: '',
})

emitter.on('onSelect', ({ name }) => {
  console.log(name)
  state.selectedName = name
})

const { selectedName } = toRefs(state)
</script>

<style scoped lang="scss">
@use './tabs-panel.scss';
</style>