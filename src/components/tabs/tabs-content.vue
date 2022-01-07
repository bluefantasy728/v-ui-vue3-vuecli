<template>
  <div class="v-tabs-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-content',
}
</script>
<script setup>
import { computed, onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({})
</script>

<style scoped lang="scss">
@import './tabs-content.scss';
</style>