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
          <th v-for="(item,index) in column" :key="item.field">{{item.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,index) in data" :key="index">
          <td v-if="selection">
            <v-checkbox :value="checkFn(row)" @change="onChangeSelect(index)"></v-checkbox>
          </td>
          <td v-for="(item) in column" :key="item.field">{{row[item.field]}}</td>
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
})

const selectedList = ref([])
const indeterminate = ref(false)
const isCheckAll = ref(false)

function checkFn(row) {
  return !!selectedList.value.find(item => item.id === row.id)
}

function changeSelectAll(val) {
  selectedList.value = val ? cloneDeep(props.data) : []
  indeterminate.value = false
}

function onChangeSelect(index) {
  const row = props.data[index]
  const idx = selectedList.value.findIndex(item => item.id === row.id)
  if (idx >= 0) {
    selectedList.value.splice(idx, 1)
  } else {
    selectedList.value.push(row)
  }
  indeterminate.value =
    selectedList.value.length > 0 &&
    selectedList.value.length < props.data.length
  isCheckAll.value = selectedList.value.length === props.data.length
}
</script>

<style scoped lang="scss">
@import 'table.scss';
</style>