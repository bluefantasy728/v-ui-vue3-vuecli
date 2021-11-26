import { mount } from '@vue/test-utils'
import Button from '../button.vue'
// import ButtonGroup from '../button-group.vue'

describe('button.vue', () => {
  it('create', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('v-button--primary')
  })
  it('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'settings',
      },
    })
    expect(wrapper.find('svg').exists()).toBeTruthy
    // expect(wrapper.classes()).toContain('v-button--danger')
  })
})
