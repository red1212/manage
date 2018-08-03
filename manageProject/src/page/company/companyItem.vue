<template>
    <div class="userItem">
        <Search :conpanyName="conpanyName" @searchList="searchList">
             <el-button v-if="shown" type="warning" slot="addBtn" @click="$router.push({path:'/companyAdd'})">添加</el-button>
        </Search>
        <ul class="itemList">
            <li v-for="(item,index) in options" :key="index" tag='li'>
                <div class="userDetail">
                    <dl  @click="editDetail(index)">
                        <dt><em class="userImage"><img src="@/assets/images/icon/Group.png"></em></dt>
                        <dd>
                            <p>{{item.name}}</p>
                            <div id="textDel">{{item.companyDesc}}</div>                      
                        </dd>
                    </dl>
                    <p>创建时间: <span>2018-4-12</span> 
                        <el-dropdown trigger="click">
                        <i class="iconfont icon-more"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="deleteItem(index)">删除</el-dropdown-item>
                            <el-dropdown-item>移动服务项</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </p>
                </div>
            </li>          
        </ul>
    </div>
</template>
<script>
import "@/script/jquery-3.0.0.min";
import {getCompanyList,searchCompany,saveCompanyInfo} from "@/api/api.js";
import Search from "./search";
export default {
  props: {
    postTitle: { type: String },
    conpanyName:{type: Object}
  },
  data() {
    return {
      shown: false,
      showMore: false,
      currentPage: "1",
      pageSize: "20",
      loading: false,
      isFinished: false,
      options: [],
      maxLen: 40,
      haystack: ""
    };
  },
  mounted() {   
    if (this.postTitle == "0") {
      this.shown = true;
    }
    this.getList();
    $(window).scroll(this.dowLoadMore); //监听滚动事件
  },
 
  components: {
    Search
  },
  methods: {
    //获取公司列表
   async getList(){
     try{
        let listParam = {
          isDelete: this.postTitle,
          page: this.currentPage,
          size: this.pageSize
        };
        let res=await getCompanyList(listParam);
        let{code,message,data} = res.data;
        if (code == '200') {
          this.options = data;
           //文字超出显示...
          return this.options.forEach(element => {
            return element.companyDesc.toString().length > 40 ? element.companyDesc = element.companyDesc.slice(0, 40) + "..." :element.companyDesc;
          });
        }else{
          console.log("error");
        }
     }catch(err){
      console.log('获取数据失败',err)
    } 
  
    },
    //查询
   async searchList(v){      //console.log(v.name)
    try{
      this.currentPage =1;  
      let params ={
        name:v.name,
        page: this.currentPage,
        size: this.pageSize,
        isDelete:this.postTitle
      }
      this.loading = true;
      let res =await searchCompany(params)
      let {code,message,data} =res.data;
      if(code ==200){
        let list = data;
        this.options = []; //清空加载的数据
        this.options = this.options.concat(list);  //加载更多数据的拼接                   
        if(list.length < this.pageSize){
          this.isFinished = true;
        }
        this.showMore = true
        this.loading = false;
      }else{
        this.$message({
          message:message,
          type: 'warning'
        });
      }
    }catch(err){
        console.log('获取数据失败',err)
    } 
    },
    //编辑公司
    editDetail(index) {
      this.$router.push({
        path: "/companyAdd",
        query: {
          id: this.options[index].id
        }
      })
    },
    //删除公司
   async deleteItem(index){
      try{
        let params ={
          id:this.options[index].id,
          isDelete:1,
          name:this.options[index].name
        }
        let res = await saveCompanyInfo(params);
        let{code,message,data} =res.data;
        if(code = 200){
          this.getList();
        }else{
          this.$message({
            message:message,
            type: 'warning'
          });
        }
      }catch(err){
        console.log('获取数据失败',err)
      }
    },
    //加载更多
    dowLoadMore() {
      //根据是否全部加载完成，判断是否继续监听页面的滚动事件
      if (!this.isFinished) {
        if (($(window).height() + $(window).scrollTop() + 430) > $(document).height()) {
          if (this.showMore) {
            this.showMore = false;
            this.currentPage++;
            //获取订单列表
            this.getOrderItem();
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/item.scss";
@import "@/assets/style/mixin.scss";
#textDel {
  height: 40px;
  overflow: hidden;
  margin-bottom: 40px;
}
.el-dropdown {
  padding-right: 20px;
  float:right;
}
.el-dropdown-menu {
  padding: 0px;
  overflow: hidden;
}
.el-dropdown-menu__item {
  text-align: center;
  @include he(40px, 40px);
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: $color_7D8EDA;
  color: #fff;
}
.el-popper /deep/ .popper__arrow {
  display: none;
}
.icon-more {
  color:#7D8EDA;
  font-size:24px;
  cursor: pointer;
}
</style>
