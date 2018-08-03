<template>
    <div class="userSearch">
        <slot name="addBtn"></slot>
        <!-- <el-button type="warning">添加</el-button> -->
        <div class="searchBox noneBorder">
            <el-input placeholder="请输入公司信息关键词" v-model="conpanyName.name">
                <el-button slot="append" icon="el-icon-search" @click="searchList">搜索</el-button>
            </el-input>
        </div>      
    </div>
</template>
<script>
export default {
  data(){
      return{
        conpanyName:{name:null}
      
      }
  },
  methods:{
      searchList(){
          this.$emit('searchList',this.conpanyName)
          this.conpanyName={}
      }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
.userSearch{margin-bottom: 30px;}
.el-button--warning {
    width:80px;
   background-color:$color_F5A623;
    margin-right: 20px;
 }
 .el-input-group__append .el-button--default{
     color:$color_7D8EDA;
     background-color:#fff;
 }
 .searchBox{
    width: 420px;
    display: inline-block;
   
}
</style>
