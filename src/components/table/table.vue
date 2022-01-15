<template>
  <div class="v-table" ref="tableContainer">
    <div :style="{height:'400px',overflow:'auto'}">
      <table class="v-table-wrap" ref="tableRef">
        <thead>
          <tr>
            <th v-if="selection">
              <v-checkbox
                v-model="isCheckAll"
                :indeterminate="indeterminate"
                @change="changeSelectAll"
              ></v-checkbox>
            </th>
            <th v-for="(item,index) in column" :key="item.field">
              <div class="v-table-header-cell">
                <span>{{item.label}}</span>
                <div
                  class="sort-icon"
                  v-if="item.field in tableSortBy"
                  @click="changeSort(item.field)"
                >
                  <v-icon name="caret-top" :class="{active:tableSortBy[item.field]==='asc'}"></v-icon>
                  <v-icon name="caret-bottom" :class="{active:tableSortBy[item.field]==='desc'}"></v-icon>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,index) in tableList" :key="index">
            <td v-if="selection">
              <v-checkbox :value="checkFn(row)" @change="onChangeSelect(index)"></v-checkbox>
            </td>
            <td
              v-for="(item) in column"
              :key="item.field"
            >{{item.value ? item.value(row,index) : row[item.field]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-table',
}
</script>
<script setup>
import { ref, computed, onMounted } from 'vue'
import vIcon from '@/components/icon/icon.vue'
import cloneDeep from 'lodash.clonedeep'

import useSelect from './useSelect'
import useSort from './useSort'
const props = defineProps({
  column: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  selection: {
    type: Boolean,
    default: false,
  },
  sortBy: {
    type: Object,
    default: () => ({}),
  },
  fixHeader: {
    type: Boolean,
    default: false,
  },
})
const tableContainer = ref(null)
const tableRef = ref(null)

const tableList = ref(props.data)
const {
  selectedList,
  indeterminate,
  isCheckAll,
  checkFn,
  changeSelectAll,
  onChangeSelect,
} = useSelect(tableList)
const { tableSortBy, changeSort } = useSort(tableList, props)

onMounted(() => {
  // console.log(tableRef)
  // return
  const tableClone = tableRef.value.cloneNode(false)
  tableClone.classList.add('v-table-clone')
  const tHead = tableRef.value.querySelector('thead')
  const { height } = tHead.getBoundingClientRect()
  tableRef.value.style.marginTop = height + 'px'

  // console.log(firstTr.offsetHeight)

  tableClone.appendChild(tHead)

  // console.log(tableRef.value.querySelectorAll('tr'))

  const firstTr = tableRef.value.querySelectorAll('tr')[0]
  // console.log(firstTr)
  const tdList = firstTr.querySelectorAll('td')

  const thList = tHead.children[0].querySelectorAll('th')
  console.log(thList)
  // Array.from(tdList).forEach((node, index) => {
  //   const { width } = node.getBoundingClientRect()
  //   thList[index].style.width = width + 'px'
  // })

  tableClone.style.background = 'pink'
  tableContainer.value.appendChild(tableClone)
})
</script>

<style scoped lang="scss">
@import 'table.scss';
</style>