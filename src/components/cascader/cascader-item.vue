<template>
  <div :class="[
      'v-cascader-item',
    ]">
    <div class="v-cascaser-item-left">
      <ul class="left-wrapper">
        <li
          class="left-column"
          :class="{'is-active':item.value === selectedItem.value}"
          v-for="(item,index) in options"
          :key="index"
          @click="onClick(item)"
        >
          <span>{{item.label}}</span>
          <span v-if="item.children && item.children.length">></span>
        </li>
      </ul>
    </div>
    <div class="v-cascaser-item-right" v-if="children.length">
      <v-cascader-item :options="children" :level="level+1"></v-cascader-item>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, inject } from 'vue'
const props = defineProps({
  options: {
    type: Array,
  },
  level: {
    type: Number,
    default: 0,
  },
})

const selected = inject('selected')
const selectNode = inject('selectNode')

const selectedItem = computed(() => {
  const val = selected[props.level]
  return props.options.find(item => item.value === val) || {}
})
const children = computed(() => {
  const arr = selectedItem.value.children
  if (arr && arr.length) return arr
  return []
})
const onClick = item => {
  const isLast = !item.children || !item.children.length
  selectNode(props.level, item.value, isLast)
}
</script>

<script>
export default {
  name: 'v-cascader-item',
}
</script>

<style scoped lang="scss">
@import 'cascader-item.scss';
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
    &:hover {
      background: $border-color-base;
    }
    &.is-active {
      color: $color-primary;
      font-weight: bold;
    }
  }
  .v-cascaser-item-right {
    margin-top: -1px;
    margin-right: -1px;
  }
}
</style>