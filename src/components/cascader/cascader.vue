<template>
  <div :class="[
      'v-cascader',
    ]">
    <div class="v-cascader-wrapper">
      <v-cascader-item :options="options"></v-cascader-item>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Array,
  },
  options: {
    type: Array,
  },
})
</script>

<script>
export default {
  name: 'v-cascader',
}
</script>

<style scoped lang="scss">
@use 'cascader.scss';
.v-cascader {
  position: relative;
  height: 40px;
  width: 150px;
  background: #eee;
  display: flex-inline;
}
.v-cascader-wrapper {
  position: absolute;
  left: 0;
  top: 100%;
}
</style>