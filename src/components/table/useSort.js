import { ref, computed } from 'vue'
import cloneDeep from 'lodash.clonedeep'

export default function useSort(tableList, props) {
  const tableSortBy = ref(props.sortBy)

  function changeSort(field) {
    let list = cloneDeep(props.data)
    const sort = tableSortBy.value[field]
    // console.log(sort)
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

  return {
    tableSortBy,
    changeSort,
  }
}
