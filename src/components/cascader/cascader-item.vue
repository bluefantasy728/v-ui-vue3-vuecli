<template>
  <div :class="[
      'v-cascader-item',
    ]">
    <div class="v-cascaser-item-left">
      <ul class="left-wrapper">
        <li class="left-column" v-for="(item,index) in options" :key="index" @click="onClick(item)">
          <span>{{item.label}}</span>
          <span v-if="item.children && item.children.length">></span>
        </li>
      </ul>
    </div>
    <div class="v-cascaser-item-right" v-if="seletedList.length">
      <v-cascader-item :options="seletedList"></v-cascader-item>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
const props = defineProps({
  options: {
    type: Array,
  },
})
const curItem = ref(null)
const seletedList = computed(() =>
  curItem.value && curItem.value.children && curItem.value.children.length
    ? curItem.value.children
    : []
)
const onClick = item => {
  curItem.value = item
}
</script>

<script>
export default {
  name: 'v-cascader-item',
}
</script>

<style scoped lang="scss">
@use 'cascader-item.scss';
.v-cascader-item {
  height: 200px;
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  cursor: pointer;
  .v-cascaser-item-left {
    overflow: auto;
  }
  .left-column {
    padding: 0.4em 0.8em;
    box-sizing: border-box;
    min-width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .v-cascaser-item-right {
    margin-top: -1px;
    margin-right: -1px;
  }
}
</style>