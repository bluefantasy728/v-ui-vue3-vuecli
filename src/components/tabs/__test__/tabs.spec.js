import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Tabs from '@/components/tabs/tabs.vue'
import TabsNav from '@/components/tabs-nav/tabs-nav.vue'
import TabsItem from '@/components/tabs-item/tabs-item.vue'
import TabsContent from '@/components/tabs-content/tabs-content.vue'
import TabsPanel from '@/components/tabs-panel/tabs-panel.vue'
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
        <v-tabs :selected="tabName" _change="changeTabName">
          <v-tabs-nav>
            <v-tabs-item name="index">首页</v-tabs-item>
            <v-tabs-item name="info">资讯</v-tabs-item>
            <v-tabs-item name="course">快上课啦</v-tabs-item>
            <v-tabs-item name="net">网易号</v-tabs-item>
          </v-tabs-nav>
          <v-tabs-content>
            <v-tabs-panel name="index">首页内容</v-tabs-panel>
            <v-tabs-panel name="info">资讯内容</v-tabs-panel>
            <v-tabs-panel name="course">快上课啦内容</v-tabs-panel>
            <v-tabs-panel name="net">网易号内容</v-tabs-panel>
          </v-tabs-content>
        </v-tabs>
      `,
    })

    console.log(wrapper)

    const navWrapper = wrapper.findComponent(TabsNav)
    const contentWrapper = wrapper.findComponent(TabsContent)

    await nextTick()

    const tabItems = navWrapper.findAll('.v-tabs-item')

    tabItems.forEach(tab => {
      console.log(tab.classes())
    })
  })
})
