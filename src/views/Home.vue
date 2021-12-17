<template>
  <div class="page">
    <div class="section section-tabs">
      <h4>Popover</h4>
      <v-popover>
        <template #trigger>
          <div class="trigger-btn">Every Little Thing</div>
        </template>
        显示popover的内容
      </v-popover>
      <v-popover trigger="hover">显示popover的内容</v-popover>
    </div>
    <div class="section section-tabs">
      <h4>Tabs</h4>
      <v-tabs v-model:selected="tabName" @change="changeTabName">
        <v-tabs-nav>
          <v-tabs-item name="index">首页</v-tabs-item>
          <v-tabs-item name="info">资讯</v-tabs-item>
          <v-tabs-item name="course">快上课啦</v-tabs-item>
          <v-tabs-item name="net">网易号</v-tabs-item>
        </v-tabs-nav>
        <v-tabs-content>
          <v-tabs-panel name="index">首页内容</v-tabs-panel>
          <v-tabs-panel name="info">资讯内容</v-tabs-panel>
          <v-tabs-panel name="course">快上课啦内容</v-tabs-panel>
          <v-tabs-panel name="net">网易号内容</v-tabs-panel>
        </v-tabs-content>
      </v-tabs>
    </div>
    <div class="section section-grid">
      <h4>Toast</h4>
      <v-button
        type="primary"
        @click="$toast.success('Top success',{duration:2000,position:'top'})"
      >top success</v-button>
      <v-button
        type="warning"
        @click="$toast.warning('Bottom warning',{duration:2000,position:'bottom'})"
      >bottom warning</v-button>
      <v-button
        type="info"
        @click="$toast.info('left info',{duration:2000,position:'left'})"
      >left info</v-button>
      <v-button
        type="danger"
        @click="$toast.error('right error',{duration:2000,position:'right'})"
      >right error</v-button>
    </div>
    <div class="section section-grid">
      <h4>栅格系统</h4>
      <v-row>
        <v-col :span="12"></v-col>
        <v-col :span="12"></v-col>
      </v-row>
      <v-row :gutter="20">
        <v-col :span="8" :phone="{span:2}"></v-col>
        <v-col :span="8" :phone="{span:12}"></v-col>
        <v-col :span="8" :phone="{span:10}"></v-col>
      </v-row>
      <v-row>
        <v-col :span="2"></v-col>
        <v-col :span="20"></v-col>
        <v-col :span="2"></v-col>
      </v-row>
      <v-row justify="center" align="center" :gutter="10">
        <v-col :span="2"></v-col>
        <v-col :span="10"></v-col>
        <v-col :span="2"></v-col>
      </v-row>
      <v-row justify="end" align="flex-end" :gutter="10">
        <v-col :span="2"></v-col>
        <v-col :span="10"></v-col>
        <v-col :span="2"></v-col>
      </v-row>
      <v-row justify="space-between" align="flex-start" :gutter="10">
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
    </div>å
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

/***** 响应式数据 *****/
const state = reactive({
  inputVal: '输入框内容',
  tabName: 'net',
})

/***** 方法定义 *****/
async function getData() {}
const changeTabName = name => {
  console.log(name)
}

/***** 声明周期和watch *****/
onMounted(async () => {})

const { inputVal, tabName } = toRefs(state)
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

