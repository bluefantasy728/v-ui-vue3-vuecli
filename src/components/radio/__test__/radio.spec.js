import { mount } from '@vue/test-utils'
import Radio from '@/components/radio/radio.vue'
import RadioGroup from '@/components/radio/radio-group.vue'
const options = [
  {
    label: '备选项1',
    value: 1,
  },
  {
    label: '备选项2',
    value: 2,
  },
  {
    label: '备选项3',
    value: 3,
  },
]
const template = `
  <v-radio-group v-model="radioVal">
    <v-radio
      v-for="(item,index) in options"
      :key="index"
      :value="item.value"
    >{{item.label}}</v-radio>
  </v-radio-group>
`
describe('radio.vue', () => {
  it('create', async () => {
    const wrapper = mount({
      components: {
        'v-radio-group': RadioGroup,
        'v-radio': Radio,
      },
      template,
      data() {
        return {
          options,
          radioVal: 2,
        }
      },
    })
    const groupWrapper = wrapper.findComponent(RadioGroup)
    const radioWrappers = groupWrapper.findAllComponents(Radio)
    const radioEls = wrapper.vm.$el.querySelectorAll('.v-radio')
    expect(radioEls.length).toBe(3)
    // 第2项应该有is-checked
    expect(radioWrappers[0].classes()).not.toContain('is-checked')
    expect(radioWrappers[1].classes()).toContain('is-checked')
    expect(radioWrappers[2].classes()).not.toContain('is-checked')

    // 点击第3项
    await radioEls[2].click()
    expect(radioWrappers[0].classes()).not.toContain('is-checked')
    expect(radioWrappers[1].classes()).not.toContain('is-checked')
    expect(radioWrappers[2].classes()).toContain('is-checked')
    // data中对应的值变成3
    expect(wrapper.componentVM.radioVal).toBe(3)
  })
})
