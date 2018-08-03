<template>
    <my-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab"> 
        <keep-alive> 
            <component :is="currentContent"> </component> 
        </keep-alive> 
    </my-tabs>

</template>
<script>
import MyTabs from '@/components/tab/tabItem'
 import userOnline from './userOnline' 
 import usreDelete from './usreDelete' 
 export default { 
     name: 'user', 
     components: { 
         MyTabs, 
         'userOnline': userOnline, 
         'usreDelete': usreDelete 
    }, 
    data () {
        return {
              tabIndex: 0,
               currentContent: 'userOnline',
               tabList: [ 
                   { index: 0, name: '在线用户', component: 'userOnline'},
                    { index: 1, name: '删除用户', component: 'usreDelete'} 
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