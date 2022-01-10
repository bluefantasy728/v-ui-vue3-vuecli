import { mount } from '@vue/test-utils'
import Pager from '@/components/pager/pager.vue'
describe('pager.vue', () => {
  it('create', () => {
    const wrapper = mount(Pager, {
      props: {
        total: 50,
      },
    })
    expect(wrapper.classes()).toContain('v-pager')
  })
  it('渲染小于8个页码', async () => {
    const wrapper = mount(Pager, {
      props: {
        total: 50,
      },
    })
    const btns = wrapper.vm.$el.querySelectorAll('.number')
    // 有5个数字按钮
    expect(btns.length).toEqual(5)
    // 默认第一个是is-active
    expect(btns[0].classList.contains('is-active')).toEqual(true)
    // 点击第2项，那第2项active
    await btns[2].click()
    expect(btns[0].classList.contains('is-active')).toEqual(false)
    expect(btns[2].classList.contains('is-active')).toEqual(true)
    // 点击向右按钮，转到第3项active
    const nextBtn = wrapper.vm.$el.querySelector('.arrow-next')
    await nextBtn.click()
    expect(btns[2].classList.contains('is-active')).toEqual(false)
    expect(btns[3].classList.contains('is-active')).toEqual(true)
  })
})
