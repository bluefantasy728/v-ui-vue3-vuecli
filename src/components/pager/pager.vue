<template>
  <div class="v-pager" :total="100">
    <ul class="v-pager-list">
      <li class="arrow arrow-prev" @click="onClickPrev">
        <v-icon name="arrow-left"></v-icon>
      </li>
      <li
        :class="[
          'number',
          {
            'is-active':current===i
          }
        ]"
        v-for="i in count"
        :key="i"
        @click="setCurrent(i)"
      >{{i}}</li>
      <li class="arrow arrow-next" @click="onClickNext">
        <v-icon name="arrow-right"></v-icon>
      </li>
    </ul>
    <!-- <v-button>></v-button> -->
  </div>
</template>
<script>
export default {
  name: 'v-pager',
}
</script>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  total: {
    // 数据总数量，不是页数的总数
    type: Number,
    default: 0,
  },
})

const size = ref(10) // 每页的数量
const current = ref(1) // 当前页

const count = computed(() => Math.ceil(props.total / size.value)) // 页面数量

function setCurrent(i) {
  current.value = i
}
function onClickPrev() {
  if (current.value > 1) {
    setCurrent(current.value - 1)
  }
}
function onClickNext() {
  if (current.value < count.value) {
    setCurrent(current.value + 1)
  }
}
</script>

<style scoped lang="scss">
@import 'pager.scss';
.v-pager {
  display: inline-block;
  white-space: nowrap;
  vertical-align: top;
  user-select: none;
  .v-pager-list {
    display: inline-block;
    white-space: nowrap;
    vertical-align: top;
    user-select: none;
    li {
      display: inline-block;
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      min-width: 30px;
      border-radius: 2px;
      padding: 0 4px;
      font-size: 13px;
      height: 28px;
      line-height: 28px;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      user-select: none;
      &.is-active {
        color: #fff;
        font-weight: bold;
        background: $color-primary;
      }
    }
  }
}
</style>