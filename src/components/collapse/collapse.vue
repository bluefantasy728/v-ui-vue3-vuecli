<template>
  <div :class="[
    'v-collapse',
    
  ]"></div>
</template>
<script>
export default {
  name: 'v-collapse',
}
</script>
<script setup>
const props = defineProps({})
</script>

<style scoped lang="scss">
@use 'collapse.scss';
</style>