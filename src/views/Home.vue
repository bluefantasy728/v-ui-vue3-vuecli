<template>
  <div class="page">
    <div class="section section-select">
      <h4>Upload</h4>
      <v-upload action="http://127.0.0.1:3003/upload" accept="image/*"></v-upload>
    </div>
    <div class="section section-select">
      <h4>Select</h4>
      <v-select clearable :options="selectOptions" v-model="selectResult"></v-select>
    </div>
    <div class="section section-sticky">
      <h4>Sticky</h4>
      <v-sticky style="margin-bottom:20px">
        <h4 style="background:#eee;padding:20px;width:300px;">I am a sticky component</h4>
      </v-sticky>
      <v-sticky distance="90px">
        <h4 style="background:#eee;padding:20px;">I am a sticky component distance="90px"</h4>
      </v-sticky>
    </div>
    <div class="section section-scrollbar">
      <h4>Scrollbar</h4>
      <v-scrollbar>
        <ul style="width:200px;margin:0;padding:0;">
          <li v-for="i in 20" :key="i" style="height:30px">选项{{i}}</li>
        </ul>
      </v-scrollbar>
    </div>
    <div class="section section-cascader">
      <h4>Cascader</h4>
      <!-- <v-cascader v-model="cascaderResult" :options="cascaderOptions"></v-cascader> -->
    </div>
    <div class="section section-collapse">
      <h4>Collapse</h4>
      <div class="flex">
        <div style="width: 500px" class="mr90">
          <v-collapse v-model:selected="collapseName" is-single>
            <v-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </v-collapse-item>
            <v-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </v-collapse-item>
            <v-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </v-collapse-item>
          </v-collapse>
        </div>
        <div style="width: 500px">
          <v-collapse v-model:selected="collapseNameArr">
            <v-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </v-collapse-item>
            <v-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </v-collapse-item>
            <v-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </v-collapse-item>
          </v-collapse>
        </div>
      </div>
    </div>
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
        @click="
          $toast.success('Top success', { duration: 2000, position: 'top' })
        "
      >top success</v-button>
      <v-button
        type="warning"
        @click="
          $toast.warning('Bottom warning', {
            duration: 2000,
            position: 'bottom',
          })
        "
      >bottom warning</v-button>
      <v-button
        type="info"
        @click="$toast.info('left info', { duration: 2000, position: 'left' })"
      >left info</v-button>
      <v-button
        type="danger"
        @click="
          $toast.error('right error', { duration: 2000, position: 'right' })
        "
      >right error</v-button>
    </div>
    <div class="section section-grid">
      <h4>栅格系统</h4>
      <v-row>
        <v-col :span="12"></v-col>
        <v-col :span="12"></v-col>
      </v-row>
      <v-row :gutter="20">
        <v-col :span="8" :phone="{ span: 2 }"></v-col>
        <v-col :span="8" :phone="{ span: 12 }"></v-col>
        <v-col :span="8" :phone="{ span: 10 }"></v-col>
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
      <v-icon name="setting"></v-icon>
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
    <v-button icon="setting">按钮</v-button>
    <v-button icon="setting">
      <span>按钮</span>
    </v-button>
    <v-button loading>加载中</v-button>
    <v-button icon="setting">
      i am button
      <v-icon name="setting"></v-icon>
    </v-button>

    <div style="margin-top: 20px">
      <v-button-group>
        <v-button icon="arrow-left">上一页</v-button>
        <v-button>刷新</v-button>
        <v-button>
          下一页
          <v-icon class="right-icon" name="arrow-right"></v-icon>
        </v-button>
      </v-button-group>
    </div>
    <hr />
    <v-input v-model="inputVal"></v-input>
    <v-input disabled v-model="inputVal"></v-input>
    <v-input clearable v-model="inputVal"></v-input>
  </div>
</template>

<script setup >
/***** 相关引入和定义 *****/
import { reactive, toRefs, onMounted, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

import { _cascaderOptions, _selectOptions } from '@/assets/cascaderOptions.js'

const store = useStore()
const { proxy } = getCurrentInstance()

/***** 响应式数据 *****/
const state = reactive({
  inputVal: '输入框内容',
  tabName: 'net',
  collapseName: '2',
  collapseNameArr: ['1', '3'],
  cascaderResult: ['zujian', 'form', 'input'],
  cascaderOptions: _cascaderOptions,
  selectOptions: _selectOptions,
  selectResult: 'kekong',
  selectResultMulti: ['kekong', 'checkbox', 'xiaolv'],
})

/***** 方法定义 *****/
async function getData() {}
const changeTabName = name => {
  // console.log(name)
}

/***** 声明周期和watch *****/
onMounted(async () => {})

const {
  inputVal,
  tabName,
  collapseName,
  collapseNameArr,
  cascaderResult,
  cascaderOptions,
  selectOptions,
  selectResult,
  selectResultMulti,
} = toRefs(state)
</script>
<style lang="scss">
@use '../style/helper.scss';
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

