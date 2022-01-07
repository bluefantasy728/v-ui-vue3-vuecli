<template>
  <div :class="[
    'v-collapse-item',
    {
      'is-active':isOpen
    }
  ]">
    <div class="v-collapse-title" @click="onClickTitle">{{title}}</div>
    <div class="v-collapse-content" ref="contentRef">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'v-collapse-item',
}
</script>
<script setup>
import { inject, ref, computed, onMounted, watch, nextTick } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})

const selected = inject('selected')
const changeSelected = inject('changeSelected')
const isSingle = inject('isSingle')
const contentRef = ref(null)

const isOpen = computed(() => {
  if (isSingle.value) {
    return props.name === selected.value
  } else {
    return selected.value.includes(props.name)
  }
})

const onClickTitle = () => {
  const _isOpen = isOpen.value
  const _isSingle = isSingle.value
  const _selected = selected.value
  if (_isSingle) {
    changeSelected(_isOpen ? '' : props.name)
  } else {
    const index = _selected.indexOf(props.name)
    index < 0 ? _selected.push(props.name) : _selected.splice(index, 1)
    changeSelected(_selected)
  }
}
const initContentStyle = () => {
  const el = contentRef.value
  if (!el.dataset) el.dataset = {}
  const styles = window.getComputedStyle(el)
  // 记录展开前的属性值
  el.dataset.oldOverflow = styles.getPropertyValue('overflow')
  el.dataset.oldPaddingTop = styles.getPropertyValue('padding-top')
  el.dataset.oldPaddingBottom = styles.getPropertyValue('padding-bottom')
  el.dataset.height = styles.getPropertyValue('height')
}
const close = async () => {
  const el = contentRef.value
  el.style.height = 0
  el.style.paddingTop = 0
  el.style.paddingBottom = 0
  el.style.overflow = 'hidden'
  await nextTick()
  el.style.transition = '0.3s height, 0.3s padding-top, 0.3s padding-bottom'
}
const open = () => {
  const el = contentRef.value
  el.style.height = el.scrollHeight + 'px'
  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
  el.style.overflow = el.dataset.oldOverflow
}

watch(
  () => isOpen.value,
  (val, oldVal) => {
    console.log(val)
    val ? open() : close()
  }
)

onMounted(() => {
  initContentStyle()
  close()
  if (isOpen.value) {
    open()
  }
})
</script>

<style scoped lang="scss">
@import 'collapse-item.scss';
.v-collapse-item {
  .v-collapse-title {
    padding: 10px;
    cursor: pointer;
  }
  .v-collapse-content {
    padding: 10px;
    overflow: hidden;
  }
  border-bottom: 1px solid $color-text-placeholder;
  &:nth-last-of-type(1) {
    border-bottom: none;
  }
}
</style>