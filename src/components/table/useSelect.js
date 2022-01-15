import { ref, computed } from 'vue'
import cloneDeep from 'lodash.clonedeep'

export default function useSelect(tableList) {
  const selectedList = ref([])
  const indeterminate = ref(false)
  const isCheckAll = ref(false)

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

  return {
    selectedList,
    indeterminate,
    isCheckAll,
    checkFn,
    changeSelectAll,
    onChangeSelect,
  }
}
