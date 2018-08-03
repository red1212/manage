<template>
  <div id="header">
     <el-header class="header headerBgColor" style="width:100%;height:80px;line-height:80px;">
      <div class="navContent el-dropdown-link">
        <em class="companyIcon"><img src="../assets/images/LOGO.png" alt="LOGO"></em>
        <el-menu
          :default-active=path
          class="el-menu-demo"
          mode="horizontal"
          background-color="#323856"
          router
          >
          <el-menu-item index="/company">公司</el-menu-item>        
          <el-menu-item index="/user">用户</el-menu-item>
          <el-menu-item index="3">产品</el-menu-item>
          <el-menu-item index="/strategy">策略</el-menu-item>
          <el-menu-item index="/order">订单</el-menu-item>
          <el-menu-item index="6">主机</el-menu-item>
          <el-menu-item index="7">目录服务</el-menu-item>
          <el-menu-item index="8">报表</el-menu-item>
           <el-menu-item index="9">帮助</el-menu-item>
        </el-menu>
        <el-dropdown trigger="click">
          <div>
            <img src="../assets/images/icon/Group2.png" alt="" class="userlogo">
            <span class="el-dropdown-link" style="color:#fff;margin-right: 20px;"> 北京构力</span>
            <img src="../assets/images/icon/drop.png" alt="Icon" class="headerdown">
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <i class=""></i> 账户设置</el-dropdown-item>
            <el-dropdown-item> <i class="el-icon-upload2"></i> 我的上传</el-dropdown-item>
            <el-dropdown-item> <i class="el-icon-download"></i> 我的下载</el-dropdown-item>
            <el-dropdown-item> <i class=""></i> 我的收藏</el-dropdown-item>
            <el-dropdown-item> <i class="el-icon-star-off"></i> 我的关注</el-dropdown-item>
            <el-dropdown-item> <i class="el-icon-document"></i> 意见反馈</el-dropdown-item>
            <el-dropdown-item> <i class=""></i> 退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>
<script>
export default {
  data(){
    return{
      path:this.$route.path
    }
   }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
    /* 头部 start */
  .companyIcon{
    position: absolute;
    top: 50%;
    margin-top: -38px;
  }
  .el-header{
    padding:0px 40px;
  }
  .headerBgColor{
    background-color:$bg;
  }
  .navContent {
    position: relative;
    height: 80px;
  }
  .navContent .logo {
    position: absolute;
    top: 20px;
  }
  .userlogo {
    position: absolute;
    right: 100px;
    top: 50%;
    margin-top: -17px;
  }
  .el-menu-demo{
    display: inline-block;
    left: 245px;
  }
  .username {
    position: absolute;
    font-size: 14px;
    right: 36px;
    top: 26px;
  }
  .headerdown {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -3px;
  }
  .el-dropdown {
    position: absolute;
    right: 0;
    cursor: pointer;
  }
  .el-menu--horizontal {
    border-right: none;
    border-bottom:none;
  }
  .el-menu-item{
    @include ft(16px,80px);
  }
  .el-menu--horizontal > .el-menu-item {
    height: 80px;
    line-height: 80px;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
    color: $write;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: $write;
    @include bordered($color:$color_7D8EDA, $width: 4px);
}
.el-menu--horizontal > .el-menu-item a, .el-menu--horizontal > .el-menu-item a:hover {
    display: block;
}
</style>
