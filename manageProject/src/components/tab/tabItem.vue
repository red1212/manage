
<!--子组件-->
<template>
  <div class="my-tabs"> 
    <!-- 标签头部 -->
    <div class="tabs-bar"> 
      <div class="tabs-bar-nav"> 
        <div class="tabs-tab" v-for="(tab,index) in tabList" :key="index" :class="[tabIndex == tab.index ? 'tabs-active' : '']" @click="changeTab(tab)">
          <i class="icon iconfont iconColor" style="float:left" :class="tab.icon"></i>
          <span>{{tab.name}}</span>
          <i class="icon iconfont iconColor icon-sanjiaoright arrow"></i>
        </div> 
        </div> 
        </div> 
        <!-- 切换的内容 -->
        <div class="tabs-content">
          <slot></slot>
          </div> 
      </div>

</template>
<script>
  export default { 
    name: 'MyTabs', 
    props: { tabList: Array, tabIndex: Number }, 
    data () { return { } },
     methods: { 
       changeTab: function (tab) { this.$emit('changeTab', tab) } 
       } 
  }

</script>
<style lang="scss">
@import '@/assets/style/tab.scss';
</style>