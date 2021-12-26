import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
export default function usePopper() {
  const popperStyle = reactive({
    position: 'absolute',
    top: 0,
    left: 0,
  })

  const popperArrowStyle = reactive({
    left: '0px',
  })

  const setArrowStyle = popperTrigger => {
    const triggerPosition = popperTrigger.getBoundingClientRect()
    popperArrowStyle.left = triggerPosition.width / 2 - 5 + 'px'
  }

  const setPopoverStyle = popperTrigger => {
    // const el = popoverRef.value
    const { left, top, width, height } = popperTrigger.getBoundingClientRect()
    popperStyle.top = top + height + window.scrollY + 15 + 'px'
    popperStyle.left = left + window.scrollX + 'px'

    setArrowStyle(popperTrigger)
  }

  return {
    popperStyle,
    setPopoverStyle,
    popperArrowStyle,
  }
}
