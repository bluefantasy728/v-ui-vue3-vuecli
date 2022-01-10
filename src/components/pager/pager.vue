<template>
  <div class="v-pager">
    <ul class="v-pager-list">
      <li
        :class="[
        'arrow arrow-prev',
        {
          'is-disabled':current===1
        }
      ]"
        @click="onClickPrev"
      >
        <v-icon name="arrow-left"></v-icon>
      </li>
      <li
        :class="[
          'number',
          {
            'is-active':current===item
          }
        ]"
        v-for="(item,index) in list"
        :key="index"
        @click="onClickBtn(item,index)"
      >
        <span v-if="item.isDot">...</span>
        <span v-else>{{item}}</span>
      </li>
      <li
        :class="[
        'arrow arrow-next',
        {
          'is-disabled':current===count
        }
      ]"
        @click="onClickNext"
      >
        <v-icon name="arrow-right"></v-icon>
      </li>
    </ul>
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
// 何时显示页码数字，何时显示省略号？页面1，最后一页，当前页，当前页+-1，当前页+-2，这7个是一直显示页码的，前后页码差距超过1的就显示省略号
const list = computed(() => {
  const cur = current.value
  let arr = []
  if (count.value < 8) {
    for (let i = 1; i <= count.value; i++) {
      arr.push(i)
    }
  } else {
    if (cur < 6) {
      arr = [1, 2, 3, 4, 5, '...', count.value]
    } else if (cur > count.value - 5) {
      arr = [
        1,
        '...',
        count.value - 4,
        count.value - 3,
        count.value - 2,
        count.value - 1,
        count.value,
      ]
    } else {
      // 所有显示数字的
      let digitalList = [
        1,
        cur,
        cur - 2,
        cur - 1,
        cur + 1,
        cur + 2,
        count.value,
      ]
      // 去重，排序再过滤到小于1的和大于count的
      digitalList = Array.from(new Set(digitalList))
        .sort((a, b) => a - b)
        .filter(item => item > 0 && item <= count.value)
      // 判断前后2个数字如果大于1的，中间就加上...
      arr = digitalList.reduce((acc, cur, index) => {
        acc.push(cur)
        if (digitalList[index + 1] - digitalList[index] > 1) {
          acc.push('...')
        }
        return acc
      }, [])
    }
  }
  return arr
})
function onClickBtn(item, index) {
  if (item === '...') {
    if (index === 1) {
      setCurrent(current.value - 5)
    } else {
      setCurrent(current.value + 5)
    }
  } else {
    setCurrent(item)
  }
}
function setCurrent(item) {
  current.value = item
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
</style>