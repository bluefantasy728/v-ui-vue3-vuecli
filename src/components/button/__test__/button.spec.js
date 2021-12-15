import { mount } from '@vue/test-utils'
import Button from '@/components/button/button.vue'
// import ButtonGroup from '../button-group.vue'
const TEXT = 'Every Little Thing'
describe('button.vue', () => {
  it('create', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('v-button--primary')
  })
  it('render text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: TEXT,
      },
    })
    expect(wrapper.text()).toEqual(TEXT)
  })
  it('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })
  it('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'settings',
      },
    })
    expect(wrapper.find('svg').exists()).toBeTruthy()
  })
  it('loading图标', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.classes()).toContain('is-loading')
  })
  it('点击触发事件', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: TEXT,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
