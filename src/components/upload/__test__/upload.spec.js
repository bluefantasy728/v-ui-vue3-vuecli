import { mount } from '@vue/test-utils'
import Upload from '@/components/upload/upload.vue'
const TEXT = 'Every Little Thing'

describe('upload.vue', () => {
  it('create', () => {
    const wrapper = mount(Upload, {
      props: {
        drag: true,
      },
    })
    expect(wrapper.find('.drag-wrap').exists()).toBe(true)
  })
  it('functionality', async () => {
    const wrapper = mount(Upload)

    const click = jest.fn()
    const input = wrapper.find('.v-upload-input').element
    input.addEventListener('click', click, false)
    await wrapper.find('.v-upload-input').trigger('click')
    expect(click).toHaveBeenCalled()
  })

  it('test dragover', async () => {
    const wrapper = mount(Upload, {
      props: {
        drag: true,
      },
    })
    const dragWrapper = wrapper.find('.drag-wrap')
    await dragWrapper.trigger('dragover')
    expect(dragWrapper.classes('is-dragover')).toBe(true)
  })

  it('test drop', async () => {
    const onDrop = jest.fn()
    const wrapper = mount(Upload, {
      props: {
        drag: true,
        onDrop,
      },
    })
    const dragWrapper = wrapper.find('.drag-wrap')
    await dragWrapper.trigger('drop', {
      dataTransfer: {
        files: [
          {
            type: 'image/png',
            name: 'test.png',
          },
        ],
      },
    })
    expect(onDrop).toHaveBeenCalledTimes(1)
  })
})
