<template>
  <div class="v-table">
    <table class="v-table-wrap">
      <thead>
        <tr>
          <th v-for="(item,index) in column" :key="item.field">{{item.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,index) in data" :key="index">
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
const props = defineProps({
  column: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="scss">
@import 'table.scss';
.v-table {
  .v-table-wrap {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid $color-text-placeholder;
    th {
      text-align: left;
    }
    th,
    td {
      padding: 8px;
      border-bottom: 1px solid $color-text-placeholder;
    }
    tbody {
      tr {
        &:nth-of-type(2n + 1) {
          background: lighten($color-text-placeholder, 20);
        }
        &:hover {
          background: lighten($color-primary, 60);
        }
      }
    }
  }
}
</style>