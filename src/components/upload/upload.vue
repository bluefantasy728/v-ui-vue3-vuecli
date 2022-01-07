<template>
  <div class="v-upload">
    <input
      class="v-upload-input"
      ref="inputRef"
      type="file"
      name="file"
      :accept="accept"
      @change="onChange"
    />
    <v-button type="primary" @click="submit">提交</v-button>
    <ul class="img-list">
      <li class="img-list-item" v-for="(item) in imgList" :key="item.filename">
        <img class="img-item" :src="`http://127.0.0.1:3003/${item.filename}`" alt />
      </li>
      <div class="add-btn">12</div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'v-upload',
}
</script>
<script setup>
import { ref, provide, computed, onMounted, getCurrentInstance } from 'vue'
const props = defineProps({
  action: String,
  accept: String,
})

const inputRef = ref(null)
const imgList = ref([])

function submit() {
  const file = inputRef.value.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', props.action)
  xhr.send(formData)

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText)
      imgList.value.push(JSON.parse(xhr.responseText))
    }
  }
}

function onChange(e) {
  console.log(e.target.files[0])
}
</script>

<style scoped lang="scss">
.v-upload-input {
  display: none;
}
.box {
  background-color: #fbfdff;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  border-radius: 6px;
}
.img-list {
  display: flex;
  .img-list-item {
    @extend .box;
    margin-right: 15px;
  }
  .img-item {
    width: 100%;
    height: 100%;
  }
  .add-btn {
    @extend .box;
    @extend .flex-center;
    border: 1px dashed #c0ccda;
  }
}
</style>