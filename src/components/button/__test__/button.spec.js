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
  it('create', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'danger',
      },
    })
    expect(wrapper.classes()).toContain('v-button--danger')
  })
})
