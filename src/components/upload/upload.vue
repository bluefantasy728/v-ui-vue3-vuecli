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
    <div
      :class="[
        'drag-wrap',
        {
          'is-dragover':isDragover
        }
      ]"
      @drop.prevent="onDrop"
      @dragover.prevent="onDragover"
      @dragleave.prevent="onDragLeave"
    >
      <v-icon name="upload1" class="upload-icon" style="font-size:67px"></v-icon>
      <p>将文件拖到此处，或点击上传</p>
    </div>
    <ul class="img-list">
      <li class="img-list-item" v-for="(item) in fileList" :key="item.filename">
        <img class="img-item" :src="`http://127.0.0.1:3003/${item.filename}`" alt />
      </li>
      <div class="add-btn" @click="add">
        <v-icon name="plus" style="font-size:22px"></v-icon>
      </div>
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
  fileList: {
    type: Array,
    default: () => [],
  },
  drag: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:fileList'])

const inputRef = ref(null)

function upload(file) {
  const formData = new FormData()
  formData.append('file', file)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', props.action)
  xhr.send(formData)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText)
      emit('update:fileList', [...props.fileList, JSON.parse(xhr.responseText)])
    }
  }
}
function add() {
  inputRef.value.click()
}

function onChange(e) {
  const file = inputRef.value.files[0]
  if (!file) return
  upload(file)
}

const isDragover = ref(false)
function onDrop(e) {
  // console.log(e.dataTransfer.files[0])
  const file = e.dataTransfer.files[0]
  if (!file) return
  upload(file)
  isDragover.value = false
}
function onDragover() {
  isDragover.value = true
}
function onDragLeave() {
  isDragover.value = false
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
.drag-wrap {
  display: inline-block;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &.is-dragover {
    border: 2px dashed $color-primary;
    background-color: lighten($color-primary, 60);
  }
  .upload-icon {
    font-size: 67px;
    fill: #d9d9d9;
    margin: 40px 0 0;
  }
}
</style>