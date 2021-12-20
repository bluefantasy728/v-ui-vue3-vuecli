import { mount } from '@vue/test-utils'
import Popover from '@/components/popover/popover.vue'
const TEXT = 'Every Little Thing'
const CONTENT = '我是popover的内容'
describe('popover.vue', () => {
  it('create', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: CONTENT,
        trigger: `<div class="trigger-btn">Every Little Thing</div>`,
      },
    })
    const triggerWrapper = wrapper.find('.v-popover-trigger')
    const triggerBtn = wrapper.find('.trigger-btn')
    const popContentWrapper = document.querySelector('.v-popover-content')
    expect(triggerBtn.text()).toBe(TEXT)
    expect(wrapper.classes('v-popover')).toBe(true)
    expect(popContentWrapper.innerHTML.includes(CONTENT)).toBe(true)
    expect(popContentWrapper.style.display).toBe('none')
    wrapper.unmount()
  })
  it('click', async () => {
    const wrapper = mount(Popover, {
      slots: {
        default: CONTENT,
      },
    })
    const triggerWrapper = wrapper.find('.v-popover-trigger')
    const popContentWrapper = document.querySelector('.v-popover-content')
    await triggerWrapper.trigger('click')
    expect(popContentWrapper.style.display).toBe('')
  })
})
