<template>
  <div class="v-checkbox-select-all">
    <div style="margin-bottom:10px">
      <v-checkbox :indeterminate="indeterminate" v-model="isCheckAll" @change="changeSelectAll">全选</v-checkbox>
    </div>
    <v-checkbox-group v-model="selectedList" @change="onChangeSelect">
      <v-checkbox v-for="(item,index) in options" :key="index" :value="item.value">{{item.label}}</v-checkbox>
    </v-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'v-checkbox-select-all',
}
</script>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  options: {
    type: Array,
  },
})

const selectedList = ref([])
const indeterminate = ref(false)
const isCheckAll = ref(false)

function changeSelectAll(val) {
  selectedList.value = val ? props.options.map(item => item.value) : []
  indeterminate.value = false
}

function onChangeSelect() {
  indeterminate.value =
    selectedList.value.length > 0 &&
    selectedList.value.length < props.options.length
  isCheckAll.value = selectedList.value.length === props.options.length
}
</script>
<style scoped lang="scss">
</style>