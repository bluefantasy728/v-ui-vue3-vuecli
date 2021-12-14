<template>
  <div class="v-tabs-nav">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-tabs-nav',
}
</script>
<script setup>
import { defineProps, computed, onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const props = defineProps({})
</script>

<style scoped lang="scss">
@use './tabs-nav.scss';
</style>