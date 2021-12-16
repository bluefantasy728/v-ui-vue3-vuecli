import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Tabs from '@/components/tabs/tabs.vue'
import TabsNav from '@/components/tabs/tabs-nav.vue'
import TabsItem from '@/components/tabs/tabs-item.vue'
import TabsContent from '@/components/tabs/tabs-content.vue'
import TabsPanel from '@/components/tabs/tabs-panel.vue'
describe('tabs.vue', () => {
  it('create', async () => {
    const wrapper = mount({
      components: {
        'v-tabs': Tabs,
        'v-tabs-panel': TabsPanel,
        'v-tabs-nav': TabsNav,
        'v-tabs-item': TabsItem,
        'v-tabs-content': TabsContent,
      },
      data() {
        return {
          tabName: 'course',
        }
      },
      template: `
        <v-tabs :selected="tabName">
          <v-tabs-nav>
            <v-tabs-item name="index">首页</v-tabs-item>
            <v-tabs-item name="info">资讯</v-tabs-item>
            <v-tabs-item name="course">快上课啦</v-tabs-item>
          </v-tabs-nav>
          <v-tabs-content>
            <v-tabs-panel name="index">首页内容</v-tabs-panel>
            <v-tabs-panel name="info">资讯内容</v-tabs-panel>
            <v-tabs-panel name="course">快上课啦内容</v-tabs-panel>
          </v-tabs-content>
        </v-tabs>
      `,
    })
    let tabPanel
    const navWrapper = wrapper.findComponent(TabsNav)
    const contentWrapper = wrapper.findComponent(TabsContent)
    await nextTick()
    const tabItems = navWrapper.findAll('.v-tabs-item')
    tabPanel = contentWrapper.find('.v-tabs-panel')
    expect(tabItems[2].classes()).toContain('active')
    expect(tabPanel.text()).toEqual('快上课啦内容')

    await tabItems[1].trigger('click')
    tabPanel = contentWrapper.find('.v-tabs-panel')
    expect(tabItems[2].classes()).not.toContain('active')
    expect(tabItems[1].classes()).toContain('active')
    expect(tabPanel.text()).toEqual('资讯内容')
  })
})
