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
      v-if="drag"
      :class="[
        'drag-wrap',
        {
          'is-dragover':isDragover
        }
      ]"
      @drop.prevent="onDrop"
      @dragover.prevent="onDragover"
      @dragleave.prevent="onDragLeave"
      @click="add"
    >
      <v-icon name="upload1" class="upload-icon" style="font-size:67px"></v-icon>
      <p>将文件拖到此处，或点击上传</p>
    </div>
    <ul class="img-list">
      <li class="img-list-item" v-for="(file,index) in fileList" :key="file.filename">
        <div class="item-mask">
          <v-icon name="delete" class="delete-icon" @click="remove(index)"></v-icon>
        </div>
        <img class="img-item" :src="`http://127.0.0.1:3003/${file.filename}`" />
      </li>
      <div class="add-btn" @click="add" v-if="!drag">
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
import { ref } from 'vue'
import useDrag from './useDrag'
import cloneDeep from 'lodash.clonedeep'
const { isDragover, onDrop, onDragover, onDragLeave } = useDrag(upload)
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
      // console.log(xhr.responseText)
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

function remove(index) {
  const list = cloneDeep(props.fileList)
  list.splice(index, 1)
  emit('update:fileList', list)
}
</script>

<style scoped lang="scss">
@import './upload';
</style>