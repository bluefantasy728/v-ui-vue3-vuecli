<template>
  <div class="page">
    <div class="section section-grid">
      <h4>栅格系统</h4>
      <v-row>
        <v-col :span="12"></v-col>
        <v-col :span="12"></v-col>
      </v-row>
      <v-row :gutter="20">
        <v-col :span="8"></v-col>
        <v-col :span="8"></v-col>
        <v-col :span="8"></v-col>
      </v-row>
      <v-row>
        <v-col :span="2"></v-col>
        <v-col :span="20"></v-col>
        <v-col :span="2"></v-col>
      </v-row>
      <v-row justify="center" :gutter="10">
        <v-col :span="2"></v-col>
        <v-col :span="10"></v-col>
        <v-col :span="2"></v-col>
      </v-row>
      <v-row justify="end" :gutter="10">
        <v-col :span="2"></v-col>
        <v-col :span="10"></v-col>
        <v-col :span="2"></v-col>
      </v-row>
      <v-row justify="space-between" :gutter="10">
        <v-col :span="2"></v-col>
        <v-col :span="10"></v-col>
        <v-col :span="2"></v-col>
      </v-row>
    </div>
    <div>
      <v-icon name="settings"></v-icon>
      <v-button>默认按钮</v-button>
      <v-button disabled>默认按钮（禁用）</v-button>
      <v-button type="primary">主要按钮</v-button>
      <v-button disabled type="primary">主要按钮禁用</v-button>
      <v-button type="success">主要按钮</v-button>
      <v-button disabled type="success">主要按钮禁用</v-button>
      <v-button type="warning">主要按钮</v-button>
      <v-button disabled type="warning">主要按钮禁用</v-button>
      <v-button type="danger">主要按钮</v-button>
      <v-button disabled type="danger">主要按钮禁用</v-button>
    </div>
    <v-button icon="settings">按钮</v-button>
    <v-button icon="settings">
      <span>按钮</span>
    </v-button>
    <v-button loading>加载中</v-button>
    <v-button icon="settings">
      i am button
      <v-icon name="settings"></v-icon>
    </v-button>

    <div style="margin-top: 20px">
      <v-button-group>
        <v-button icon="left">上一页</v-button>
        <v-button>刷新</v-button>
        <v-button>
          下一页
          <v-icon class="right-icon" name="left"></v-icon>
        </v-button>
      </v-button-group>
    </div>
    <hr />
    <v-input v-model="inputVal"></v-input>
    <v-input disabled v-model="inputVal"></v-input>
  </div>
</template>

<script setup >
/***** 相关引入和定义 *****/
import { reactive, toRefs, onMounted, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const { proxy } = getCurrentInstance()
// console.log('proxy', proxy);
// console.log(proxy.mixinVar);
// proxy.$emitter.on('myEvent', msg => {
//   console.log(msg);
// });

/***** 响应式数据 *****/
const state = reactive({
  inputVal: '输入框内容123',
})

/***** 方法定义 *****/
async function getData() {}

/***** 声明周期和watch *****/
onMounted(async () => {})

const { inputVal } = toRefs(state)
</script>
<style lang="scss">
.v-input,
.v-button {
  margin-right: 10px;
}
.section {
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #000;
  & > h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
.section-grid {
  .v-row {
    margin-bottom: 5px;
    .v-col {
      height: 30px;
      &:nth-of-type(2n) {
        background: #ccc;
      }
      &:nth-of-type(2n + 1) {
        background: #eee;
      }
    }
  }
}
</style>

