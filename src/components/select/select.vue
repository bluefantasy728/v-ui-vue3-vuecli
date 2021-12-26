<template>
  <div class="v-select" ref="selectRef" @click="handleClick">
    <v-input readonly clearable ref="inputRef" v-model="selectedLabel" @clear="clear">
      <template #right-slot>
        <!-- <v-icon _v-if="clearable" class="close-icon" name="close" @click.self="clear"></v-icon> -->
        <v-icon
          :class="[
          'caret-icon',
          {
            'is-up':isOpen
          }
        ]"
          class="caret-icon"
          name="arrow-down"
        ></v-icon>
      </template>
    </v-input>
    <v-popper ref="popperRef">
      <v-scrollbar>
        <ul class="v-select-option-wrap">
          <li
            :class="[
              'v-select-option-item',
              {
                'is-active':item.value === modelValue
              }
            ]"
            class
            v-for="(item,index) in options"
            :key="index"
            @click="handleSelect(item)"
          >{{item.label}}</li>
        </ul>
      </v-scrollbar>
    </v-popper>
  </div>
</template>
<script>
export default {
  name: 'v-select',
}
</script>
<script setup>
import { ref, onMounted, provide, computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])
const selectRef = ref(null)
const inputRef = ref(null)
const popperRef = ref(null)
const isOpen = ref(false)
const setIsOpen = flag => {
  isOpen.value = flag
}
provide('triggerRef', inputRef)
provide('isOpen', isOpen)
provide('setIsOpen', setIsOpen)

const selectedLabel = computed(() => {
  const selected = props.options.find(item => item.value === props.modelValue)
  return selected ? selected.label : ''
})

const handleClick = async () => {
  // setTimeout(() => {
  //   console.log(isOpen.value)
  //   if (isOpen.value) {
  //     close()
  //   } else {
  //     open()
  //   }
  // }, 0)
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const close = () => {
  setIsOpen(false)
}
const open = () => {
  popperRef.value.setPopoverStyle(inputRef.value.$el)
  setIsOpen(true)
}

const handleSelect = item => {
  emit('update:modelValue', item.value)
  setIsOpen(false)
}

const clear = () => {}
</script>

<style scoped lang="scss">
@use 'select.scss';
@import '../../style/index.scss';
.v-select {
  display: inline-block;
  position: relative;
  ::v-deep {
    .v-input-inner {
      cursor: pointer;
    }
    .caret-icon {
      transition: 0.3s all;
      font-size: 12px;
      &.is-up {
        transform: rotateZ(180deg);
      }
    }
  }
}
.v-select-option-wrap {
  background: #fff;
  .v-select-option-item {
    padding: 0 32px 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $color-text-primary;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background: lighten($color-text-placeholder, 20);
    }
    &.is-active {
      background: lighten($color-text-placeholder, 20);
      color: $color-primary;
      font-weight: bold;
    }
  }
}
</style>