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
import {
  ref,
  computed,
  onMounted,
  getCurrentInstance,
  provide,
  watch,
} from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({
  selected: {
    type: [String, Number],
    default: '',
  },
})

const emit = defineEmits(['update:selected', 'change'])

const selectedName = ref(props.selected)
const changeName = name => {
  selectedName.value = name
  emit('update:selected', name)
  emit('change', name)
}

provide('selectedName', selectedName)
provide('changeName', changeName)
</script>

<style scoped lang="scss">
@use './tabs.scss';
// .v-tabs {
// }
</style>