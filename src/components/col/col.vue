<template>
  <div :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-col',
}
</script>
<script setup>
import { inject, computed } from 'vue'
const props = defineProps({
  span: {
    type: Number,
    default: 1,
  },
  phone: {
    type: Object,
    validator: value => {
      let keys = Object.keys(value)
      let valid = true
      keys.forEach(key => {
        if (!['span'].includes(key)) {
          valid = false
        }
      })
      return valid
    },
  },
})
const gutter = inject('gutter')
const colStyle = computed(() => {
  return {
    marginLeft: gutter / 2 + 'px',
    marginRight: gutter / 2 + 'px',
  }
})
const colClass = computed(() => {
  const { span, phone } = props
  let phoneClasses = []
  if (phone) {
    phone.span && phoneClasses.push(`v-col-phone-${phone.span}`)
  }
  return ['v-col', span && `v-col-${span}`, ...phoneClasses]
})
</script>

<style scoped lang="scss">
@import './col.scss';
</style>