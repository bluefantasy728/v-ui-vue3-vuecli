import { ref } from 'vue'

export default function useDrag(uploadFn) {
  const isDragover = ref(false)
  function onDrop(e) {
    const file = e.dataTransfer.files[0]
    if (!file) return
    uploadFn(file)
    isDragover.value = false
  }
  function onDragover() {
    isDragover.value = true
  }
  function onDragLeave() {
    isDragover.value = false
  }
  return {
    isDragover,
    onDrop,
    onDragover,
    onDragLeave,
  }
}
