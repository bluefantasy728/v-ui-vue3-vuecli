import { mount } from '@vue/test-utils'
import Checkbox from '@/components/checkbox/checkbox.vue'
import CheckboxGroup from '@/components/checkbox/checkbox-group.vue'
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
  <v-checkbox-group v-model="checkboxVal">
    <v-checkbox
      v-for="(item,index) in options"
      :key="index"
      :value="item.value"
    >{{item.label}}</v-checkbox>
  </v-checkbox-group>
`
describe('checkbox.vue', () => {
  it('create', async () => {
    const wrapper = mount({
      components: {
        'v-checkbox-group': CheckboxGroup,
        'v-checkbox': Checkbox,
      },
      template,
      data() {
        return {
          options,
          checkboxVal: [2, 3],
        }
      },
    })
    const groupWrapper = wrapper.findComponent(CheckboxGroup)
    const checkboxWrappers = groupWrapper.findAllComponents(Checkbox)
    const checkboxEls = wrapper.vm.$el.querySelectorAll('.v-checkbox')
    expect(checkboxEls.length).toBe(3)
    // // 第2项应该有is-checked
    expect(checkboxWrappers[0].classes()).not.toContain('is-checked')
    expect(checkboxWrappers[1].classes()).toContain('is-checked')
    expect(checkboxWrappers[2].classes()).toContain('is-checked')

    // // 点击第1,2项
    await checkboxEls[0].click()
    await checkboxEls[1].click()
    expect(checkboxWrappers[0].classes()).toContain('is-checked')
    expect(checkboxWrappers[1].classes()).not.toContain('is-checked')
    expect(checkboxWrappers[2].classes()).toContain('is-checked')
    // data中对应的值变成3
    expect(wrapper.componentVM.checkboxVal).toContain(1)
    expect(wrapper.componentVM.checkboxVal).toContain(3)
    expect(wrapper.componentVM.checkboxVal).not.toContain(2)
  })
})
