import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
export default function usePopover() {
  const popperStyle = reactive({
    top: 0,
    left: 0,
  })

  const popperArrowStyle = reactive({
    left: '0px',
  })

  const setArrowStyle = popoverTriggerRef => {
    const elTrigger = popoverTriggerRef.value
    const triggerPosition = elTrigger.getBoundingClientRect()
    popperArrowStyle.left = triggerPosition.width / 2 - 5 + 'px'
  }

  const setPopoverStyle = (popoverRef, popoverTriggerRef) => {
    const el = popoverRef.value
    const { left, top, width, height } = el.getBoundingClientRect()
    popperStyle.top = top + window.scrollY - 15 + 'px'
    popperStyle.left = left + window.scrollX + 'px'

    setArrowStyle(popoverTriggerRef)
  }

  return {
    popperStyle,
    setPopoverStyle,
    popperArrowStyle,
  }
}
