<template>
    <my-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab"> 
        <keep-alive> 
            <component :is="currentContent"> </component> 
        </keep-alive> 
    </my-tabs>

</template>
<script>
import MyTabs from '@/components/tab/tabItem'
import successIndex from './success/index' 
import creatIndex from './creat/index' 
import failIndex from './fail/index'
import overIndex from './over/index'
import delateIndex from './delate/index'
 export default { 
     name: 'order', 
     components: { 
         MyTabs, 
         'successIndex': successIndex, 
         'creatIndex': creatIndex,
         'failIndex': failIndex,
         'overIndex': overIndex,
         'delateIndex': delateIndex
    }, 
     data () {
         return {
              tabIndex: 0,
               currentContent: 'successIndex',
               tabList: [ 
                    { index: 0, name: '成功', component: 'successIndex' },
                    { index: 1, name: '创建中', component: 'creatIndex' },
                    { index: 2, name: '失败', component: 'failIndex' },
                    { index: 3, name: '过期', component: 'overIndex' },
                    { index: 4, name: '删除', component: 'delateIndex' }   
                    ] } 
                    },
                     methods: { // 切换选项卡 
                     changeTab: function (tab) { 
                         this.tabIndex = tab.index 
                         this.currentContent = tab.component 
                        }
                          } }
</script>
<style lang="scss">
 @import '../../assets/style/gl.scss'
</style>