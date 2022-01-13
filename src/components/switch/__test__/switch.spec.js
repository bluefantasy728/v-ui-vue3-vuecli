import { mount } from '@vue/test-utils'
import Switch from '@/components/switch/switch.vue'

describe('switch.vue', () => {
  it('create', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    })
    expect(wrapper.classes()).toContain('v-switch')
  })
  it('functionality', async () => {
    const wrapper = mount({
      components: {
        'v-switch': Switch,
      },
      template: `
        <v-switch v-model="value"></v-switch>
      `,
      data() {
        return {
          value: false,
        }
      },
    })
    const inner = wrapper.find('.v-switch-inner')
    expect(inner.classes()).not.toContain('is-active')
    await wrapper.trigger('click')
    expect(inner.classes()).toContain('is-active')
  })
})
