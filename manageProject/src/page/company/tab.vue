<template>
    <my-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab"> 
        <keep-alive> 
            <component :is="currentContent"> </component> 
        </keep-alive> 
    </my-tabs>

</template>
<script>
import MyTabs from '@/components/tab/tabItem'
import companyList from './companyList' 
import companyDelete from './companyDelete' 

 export default { 
     name: 'order', 
     components: { 
         MyTabs, 
         'companyDelete': companyDelete, 
         'companyList': companyList
    }, 
     data () {
         return {
              tabIndex: 0,
               currentContent: 'companyList',
               tabList: [ 
                    { index: 0, name: '公司列表', component: 'companyList',icon:'icon-shuju' },
                    { index: 1, name: '删除公司', component: 'companyDelete',icon:'icon-icon' }  
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