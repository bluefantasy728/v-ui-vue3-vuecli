<template>
  <div class="v-table">
    <table class="v-table-wrap">
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
          <!-- <td v-for="(item) in column" :key="item.field">{{row[item.field]}}</td> -->
          <td
            v-for="(item) in column"
            :key="item.field"
          >{{item.value ? item.value(row,index) : row[item.field]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'v-table',
}
</script>
<script setup>
import { ref, computed } from 'vue'
import vIcon from '@/components/icon/icon.vue'
import cloneDeep from 'lodash.clonedeep'
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
})

const tableList = ref(props.data)
const selectedList = ref([])
const indeterminate = ref(false)
const isCheckAll = ref(false)
const tableSortBy = ref(props.sortBy)

function checkFn(row) {
  return !!selectedList.value.find(item => item.id === row.id)
}

function changeSelectAll(val) {
  selectedList.value = val ? cloneDeep(tableList.value) : []
  indeterminate.value = false
}

function onChangeSelect(index) {
  const row = tableList.value[index]
  const idx = selectedList.value.findIndex(item => item.id === row.id)
  if (idx >= 0) {
    selectedList.value.splice(idx, 1)
  } else {
    selectedList.value.push(row)
  }
  indeterminate.value =
    selectedList.value.length > 0 &&
    selectedList.value.length < tableList.value.length
  isCheckAll.value = selectedList.value.length === tableList.value.length
}

function changeSort(field) {
  let list = cloneDeep(props.data)
  const sort = tableSortBy.value[field]
  console.log(sort)
  if (sort === 'asc') {
    tableSortBy.value[field] = 'desc'
    list.sort((a, b) => a[field] - b[[field]])
  } else if (sort === 'desc') {
    tableSortBy.value[field] = ''
    list = cloneDeep(props.data)
  } else {
    tableSortBy.value[field] = 'asc'
    list.sort((a, b) => b[field] - a[[field]])
  }
  tableList.value = list
}
</script>

<style scoped lang="scss">
@import 'table.scss';
</style>