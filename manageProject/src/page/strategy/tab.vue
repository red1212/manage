<template>
    <my-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">  
        <component :is="currentContent"> </component> 
        <div class="container">
            <router-view></router-view>
        </div>  
    </my-tabs>

</template>
<script>
import MyTabs from "@/components/tab/tabItem";
import All from "./all/index";
import USB from "./USB/index";
import Printer from "./Printer/index";
import File from "./file/index";
import Cut from "./cut/index";
import Field from "./area/index"
export default {
  name: "user",
  components: {
    MyTabs,
    All:All,
    USB: USB,
    Printer: Printer,
    File:File,
    Cut:Cut,
    Field:Field
  },
  data() {
    return {
      tabIndex: 0,
      currentContent: "All",
      tabList: [
        { index: 0, name: "全部", component: "All",icon:"icon-quanbu"},
        { index: 1, name: "USB", component: "USB",icon:"icon-USB"},
        { index: 2, name: "打印机", component: "Printer",icon:"icon-dayinji"},
        { index: 3, name: "文件传输", component: "File",icon:"icon-wenjianchuanshu"},
        { index: 4, name: "剪切板", component: "Cut",icon:"icon-jianqieban"},
        { index: 5, name: "域", component: "Field",icon:"icon-yu"}
      ]
    };
  },
  methods: {
    // 切换选项卡
    changeTab: function(tab) {
      this.tabIndex = tab.index;
      this.currentContent = tab.component;
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/style/gl.scss";
</style>